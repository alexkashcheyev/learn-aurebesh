import { Page } from "../Page/Page";
import { Text } from '../Text/Text';
import { sample } from 'lodash';
import { QUOTES } from "../../domain/quotes";
import { ActionPanel } from "../ActionPanel/ActionPanel";

export function QuotePage() {
  const quote = sample(QUOTES);

  return <Page footer={<ActionPanel>Action Panel</ActionPanel>}>
    <Text testId="quote-content">{quote?.content}</Text>
    <Text testId="quote-source">{quote?.source}</Text>
  </Page>
}