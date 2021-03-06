import { Page } from "../Page/Page";
import { sample } from "lodash";
import { Quote, QUOTES } from "../../domain/quotes";
import { ActionPanel } from "../ActionPanel/ActionPanel";
import { ActionButton } from "../ActionButton/ActionButton";
import React, { useEffect, useState } from "react";
import {
  AppSettings,
  DEFAULT_SPEED,
  getLettersToAdd,
  LETTERS_PER_QUOTE,
  useSettings,
} from "../../domain/settings";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { REPLACEMENT_ORDER } from "../../domain/replacement";
import { TrainingText } from "../TrainingText/TrainingText";
import { CheatSheet } from "../CheatSheet/CheatSheet";

export function increaseDifficulty({
  count,
  ignoreLetters,
  quotes,
  newLetters = [],
}: {
  count: number;
  ignoreLetters: string[];
  quotes: Quote[];
  newLetters?: string[];
}): { quotes: Quote[]; newLetters: string[] } {
  if (count < 1) {
    return {
      quotes,
      newLetters,
    };
  }

  const newLetter = REPLACEMENT_ORDER.find(
    (letter) =>
      !ignoreLetters.includes(letter) &&
      !!quotes.find((quote) => quote.content.toLowerCase().includes(letter))
  );

  if (!newLetter) {
    return {
      quotes,
      newLetters,
    };
  }

  return increaseDifficulty({
    count: count - 1,
    ignoreLetters: [...ignoreLetters, newLetter],
    quotes: quotes.filter((quote) =>
      quote.content.toLowerCase().includes(newLetter)
    ),
    newLetters: [...newLetters, newLetter],
  });
}

export function QuotePage() {
  const { update, lettersToAdd, speed, replacedLetters } = useSettings();
  const fittingQuotes =
    replacedLetters.length > 0
      ? QUOTES.filter(
          (quote) =>
            !!replacedLetters.find((letter) =>
              quote.content.toLowerCase().includes(letter)
            )
        )
      : QUOTES;

  const [quote, setQuote] = useState(sample(fittingQuotes));

  useEffect(() => {
    if (replacedLetters.length === 0) {
      update({ lettersToAdd: 1 });
    }
    // eslint-disable-next-line
  }, [replacedLetters]);

  useEffect(() => {
    global.scrollTo(0, 0);
  }, [quote]);

  const nextQuote = (overrideUpdate?: Partial<AppSettings>) => {
    const lettersAdded =
      replacedLetters.length === REPLACEMENT_ORDER.length
        ? 0
        : Math.floor(lettersToAdd);

    const { quotes, newLetters } = increaseDifficulty({
      count: lettersAdded,
      ignoreLetters: replacedLetters,
      quotes: fittingQuotes,
    });

    setQuote(sample(quotes));

    update({
      lettersToAdd: lettersToAdd - lettersAdded + getLettersToAdd(speed),
      replacedLetters: [...replacedLetters, ...newLetters],
      ...overrideUpdate,
    });
  };

  return (
    <Page
      footer={
        <ActionPanel progress={speed / (LETTERS_PER_QUOTE.length - 1)}>
          <Link to="/">
            <ActionButton testId="settings-btn">
              <FontAwesomeIcon icon={faHome} size="2x" />
            </ActionButton>
          </Link>

          <ActionButton
            testId="slow-down-btn"
            onClick={() => {
              update({
                speed: speed - 1,
                replacedLetters: replacedLetters.filter(
                  (letter, index) => index !== replacedLetters.length - 1
                ),
              });
            }}
            disabled={speed === 0}
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} size="2x" />
          </ActionButton>

          <ActionButton
            testId="next-quote-btn"
            onClick={() => nextQuote({})}
            priority="primary"
          >
            <FontAwesomeIcon icon={faAngleRight} size="2x" />
          </ActionButton>

          <ActionButton
            testId="speed-up-btn"
            onClick={() => nextQuote({ speed: speed + 1 })}
            disabled={speed === LETTERS_PER_QUOTE.length - 1}
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} size="2x" />
          </ActionButton>
        </ActionPanel>
      }
      header={
        <CheatSheet
          progress={replacedLetters.length / REPLACEMENT_ORDER.length}
        />
      }
    >
      <TrainingText
        testId="quote-content"
        text={quote?.content}
        replacedCharacters={replacedLetters}
      />
      <TrainingText
        className="source"
        testId="quote-source"
        text={quote?.source}
        replacedCharacters={replacedLetters}
      />
    </Page>
  );
}
