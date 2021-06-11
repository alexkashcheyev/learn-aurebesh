import { render, act } from '@testing-library/react';
import { QUOTES } from '../../domain/quotes';
import { QuotePage } from './QuotePage';

export class QuotePageDriver {
  private page;

  constructor() {
    this.page = render(<QuotePage />);
  }

  getQuoteContent() {
    return this.page.getByTestId('quote-content').textContent;
  }

  getQuoteSource() {
    return this.page.getByTestId('quote-source').textContent;
  }
}

describe('Quote page', () => {
  it('should show a quote from the array', () => {
    const driver = new QuotePageDriver();
    const content = driver.getQuoteContent();
    const source = driver.getQuoteSource();

    expect(QUOTES).toContainEqual(expect.objectContaining({content, source}));
  })
})