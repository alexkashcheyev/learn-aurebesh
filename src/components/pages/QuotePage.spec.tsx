import { render, act } from '@testing-library/react';
import { QUOTES } from '../../domain/quotes';
import { AppSettings, mockUseSettings } from '../../domain/settings';
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
    return this.page.getByTestId('quote-content').textContent;
  }

  getQuoteSource() {
    return this.page.getByTestId('quote-source').textContent;
  }

  clickNext() {
    this.page.getByTestId('next-quote-btn').click();
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
  it('should show a quote from the array', () => {
    const driver = new QuotePageDriver({});
    const content = driver.getQuoteContent();
    const source = driver.getQuoteSource();

    expect(QUOTES).toContainEqual(expect.objectContaining({content, source}));
  });

  it('should show a new quote after "next" button was clicked', () => {
    const driver = new QuotePageDriver({});
    const oldContent = driver.getQuoteContent();
    
    act(() => driver.clickNext());

    const newContent = driver.getQuoteContent();

    expect(newContent).not.toEqual(oldContent);
  });

  it('should add a new letter to the replace after "next" button was clicked', () => {
    const driver = new QuotePageDriver({});

    act(() => driver.clickNext());

    expect(
      driver.updateRequested({
        replacedLetters: [expect.stringMatching(/[a-z]/)]
      })
    ).toEqual(true);
  });
})