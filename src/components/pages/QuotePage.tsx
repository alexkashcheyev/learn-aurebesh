import { Page } from "../Page/Page";
import { Text } from '../Text/Text';
import { sample } from 'lodash';
import { QUOTES } from "../../domain/quotes";
import { ActionPanel } from "../ActionPanel/ActionPanel";
import { ActionButton } from "../ActionButton/ActionButton";
import React, { useState } from "react";
import { AppSettings, getLettersToAdd, LETTERS_PER_QUOTE, useSettings } from "../../domain/settings";
import { Link }from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faAngleDoubleLeft, faAngleDoubleRight, faAngleRight } from '@fortawesome/free-solid-svg-icons'

function newQuote() {
  return sample(QUOTES);
}

export function QuotePage() {
  const [ quote, setQuote ] = useState(newQuote());
  const { update, lettersToAdd, speed } = useSettings();

  console.log({speed})

  const nextQuote = (overrideUpdate?: Partial<AppSettings>) => {
    update({
      lettersToAdd: lettersToAdd + getLettersToAdd(speed),
      ...overrideUpdate,
    });
    setQuote(newQuote());
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