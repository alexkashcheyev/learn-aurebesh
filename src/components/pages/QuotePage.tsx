import { Page } from "../Page/Page";
import { Text } from '../Text/Text';
import { sample } from 'lodash';
import { Quote, QUOTES } from "../../domain/quotes";
import { ActionPanel } from "../ActionPanel/ActionPanel";
import { ActionButton } from "../ActionButton/ActionButton";
import React, { useState } from "react";
import { AppSettings, getLettersToAdd, LETTERS_PER_QUOTE, useSettings } from "../../domain/settings";
import { Link }from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faAngleDoubleLeft, faAngleDoubleRight, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { REPLACEMENT_ORDER } from "../../domain/replacement";

export function increaseDifficulty({
  count,
  ignoreLetters,
  quotes,
  newLetters = []
} : {
  count: number;
  ignoreLetters: string[];
  quotes: Quote[];
  newLetters?: string[];
}): { quotes: Quote[], newLetters: string[] } {
  if (count < 1) {
    return {
      quotes,
      newLetters,
    }
  }

  const newLetter = REPLACEMENT_ORDER.find(
    letter =>
      !ignoreLetters.includes(letter) &&
      !!quotes.find(quote => quote.content.includes(letter))
  );

  if (!newLetter) {
    return {
      quotes,
      newLetters
    }
  }

  return increaseDifficulty({
    count: count - 1,
    ignoreLetters: [
      ...ignoreLetters,
      newLetter
    ],
    quotes: quotes.filter(quote => quote.content.includes(newLetter)),
    newLetters: [ 
      ...newLetters,
      newLetter 
    ]
  })
}

export function QuotePage() {
  const { update, lettersToAdd, speed, replacedLetters } = useSettings();
  const [ quote, setQuote ] = useState(sample(QUOTES));

  const nextQuote = (overrideUpdate?: Partial<AppSettings>) => {
    const lettersAdded = 
      replacedLetters.length === REPLACEMENT_ORDER.length 
      ? 0
      : Math.floor(lettersToAdd);

    const { quotes, newLetters} = increaseDifficulty({
      count: lettersAdded,
      ignoreLetters: replacedLetters,
      quotes: QUOTES
    });

    setQuote(sample(quotes));

    update({
      lettersToAdd:
        (lettersToAdd - lettersAdded) + getLettersToAdd(speed),
      replacedLetters: [
        ...replacedLetters,
        ...newLetters,
      ],
      ...overrideUpdate,
    });
  }

  return <Page 
      footer={<ActionPanel>

        <Link to="/settings">
          <ActionButton testId="settings-btn">
            <FontAwesomeIcon icon={faCog} />
          </ActionButton>
        </Link>

        <ActionButton
          testId="slow-down-btn"
          onClick={() => update({speed: speed - 1})}
          disabled={speed === 0}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </ActionButton>

        <ActionButton
          testId="next-quote-btn"
          onClick={() => nextQuote({})}
        >
          <FontAwesomeIcon icon={faAngleRight}  />
        </ActionButton>

        <ActionButton
          testId="speed-up-btn"
          onClick={() => nextQuote({speed: speed + 1})}
          disabled={speed === LETTERS_PER_QUOTE.length - 1}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </ActionButton>

      </ActionPanel>}
  >
    <Text testId="quote-content">{quote?.content}</Text>
    <Text testId="quote-source">{quote?.source}</Text>
  </Page>
}