import { render, act } from '@testing-library/react';
import { QUOTES } from '../../domain/quotes';
import { AppSettings, DEFAULT_SPEED, mockUseSettings, LETTERS_PER_QUOTE, getLettersToAdd } from '../../domain/settings';
import { QuotePage } from './QuotePage';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';

export class QuotePageDriver {
  private page;
  public readonly settings;
  public readonly history: MemoryHistory;

  constructor({
    overrideSettings = {}
  }: {
    overrideSettings?: Partial<AppSettings>
  }) {
    this.settings = mockUseSettings(overrideSettings)
    this.history = createMemoryHistory();
    this.page = render(
      <Router history={this.history}>
        <QuotePage />
      </Router>
    );
  }

  getQuoteContent() {
    return this.page.getByTestId('quote-content').textContent.trim();
  }

  getQuoteSource() {
    return this.page.getByTestId('quote-source').textContent.trim();
  }

  clickNext() {
    this.page.getByTestId('next-quote-btn').click();
  }

  clickSpeedUp() {
    this.page.getByTestId('speed-up-btn').click();
  }

  clickSlowDown() {
    this.page.getByTestId('slow-down-btn').click();
  }

  updateRequested(arg: Partial<AppSettings>) {
    try {
      expect(this.settings.update)
        .toHaveBeenCalledWith(
          expect
            .objectContaining(arg)
        );
      return true;
    } catch (e) {
      return false;
    }
  }
}

describe('Quote page', () => {
  beforeEach(() => {
    jest.spyOn(global, 'scrollTo').mockImplementation(() => {});
  })

  afterEach(() => {
    jest.restoreAllMocks();
  })

  it('should show a quote from the array', () => {
    const driver = new QuotePageDriver({});
    const content = driver.getQuoteContent();
    const source = driver.getQuoteSource();

    expect(QUOTES).toContainEqual(expect.objectContaining({content, source}));
  });

  describe('"Next quote" button', () => {
    it('should show a new quote', () => {
      const driver = new QuotePageDriver({});
      const oldContent = driver.getQuoteContent();
      
      act(() => driver.clickNext());

      const newContent = driver.getQuoteContent();

      expect(newContent).not.toEqual(oldContent);
    });

    it('should increase lettersToAdd counter', () => {
      const driver = new QuotePageDriver({ overrideSettings: { lettersToAdd: 0.5 } });
      const oldLettersToAdd = driver.settings.lettersToAdd;

      act(() => driver.clickNext());

      expect(driver.updateRequested({
        lettersToAdd: oldLettersToAdd + getLettersToAdd(driver.settings.speed)
      })).toEqual(true);
    });

    it('should not change the speed', () => {
      const driver = new QuotePageDriver({});

      act(() => driver.clickNext());

      expect(driver.updateRequested({
        speed: expect.anything()
      })).toEqual(false);
    });
  })

  describe('"Speed up" button', () => {
    it('should increase speed after "speed up" button was clicked', () => {
      const driver = new QuotePageDriver({});
  
      act(() => driver.clickSpeedUp());
  
      expect(
        driver.updateRequested({
          speed: DEFAULT_SPEED + 1
        })
      ).toEqual(true);
    });

    it('should show new quote', () => {
      const driver = new QuotePageDriver({});
      const oldContent = driver.getQuoteContent();
      
      act(() => driver.clickSpeedUp());

      const newContent = driver.getQuoteContent();
      expect(newContent).not.toEqual(oldContent)
    });

    it('should be disabled if maximum speed reached', () => {
      const driver = new QuotePageDriver({ 
        overrideSettings: {
          speed: LETTERS_PER_QUOTE.length - 1,
        }
      });

      act(() => driver.clickSpeedUp());

      expect(driver.updateRequested({
        speed: expect.anything()
      })).toEqual(false);
    })
  });

  describe('"Slow down" button', () => {
    it('should decrease the speed', () => {
      const driver = new QuotePageDriver({});
      
      act(() => driver.clickSlowDown());
  
      expect(
        driver.updateRequested({
          speed: DEFAULT_SPEED - 1
        })
      ).toEqual(true);
    });

    it('should not change the quote', () => {
      const driver = new QuotePageDriver({});
      const oldQuoteContent = driver.getQuoteContent();
      
      act(() => driver.clickSlowDown());

      expect(driver.getQuoteContent()).toEqual(oldQuoteContent);
    });

    it('should be disabled if minimum speed reached', () => {
      const driver = new QuotePageDriver({
        overrideSettings: {
          speed: 0,
        }
      });
      
      act(() => driver.clickSlowDown());

      expect(
        driver.updateRequested({
          speed: expect.anything(),
        }),
      ).toEqual(false);
    });
  });
})