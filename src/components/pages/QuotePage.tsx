import { Page } from "../Page/Page";
import { Text } from '../Text/Text';
import { sample } from 'lodash';
import { QUOTES } from "../../domain/quotes";
import { ActionPanel } from "../ActionPanel/ActionPanel";
import { ActionButton } from "../ActionButton/ActionButton";
import React, { useState } from "react";
import { useSettings } from "../../domain/settings";
import { REPLACEMENT_ORDER } from "../../domain/replacement";
import { Link }from 'react-router-dom';

function newQuote() {
  return sample(QUOTES);
}

function nextLetter(replaced: string[], order: string[]) {
  if (replaced.length === order.length) {
    return undefined;
  } else {
    return order.find(letter => !replaced.includes(letter));
  }
}

export function QuotePage() {
  const [ quote, setQuote ] = useState(newQuote());
  const { update, replacedLetters } = useSettings();

  return <Page 
      footer={<ActionPanel>
        <Link to="/settings">
          <ActionButton testId="settings-btn" />
        </Link>
        <ActionButton testId="too-hard-btn" />
        <ActionButton testId="too-easy-btn" />
        <ActionButton testId="next-quote-btn" onClick={() => {
          const next = nextLetter(replacedLetters, REPLACEMENT_ORDER);
          if (next) {
            update({ replacedLetters: [...replacedLetters, next] });
          }
          setQuote(newQuote());
        }} />
      </ActionPanel>}>
    <Text testId="quote-content">{quote?.content}</Text>
    <Text testId="quote-source">{quote?.source}</Text>
  </Page>
}