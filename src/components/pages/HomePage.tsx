import React from "react";
import { Page } from "../Page/Page";
import { Text } from "../Text/Text";
import { Link } from "react-router-dom";
import { useSettings } from "../../domain/settings";
import { ActionPanel } from "../ActionPanel/ActionPanel";
import { ActionButton } from "../ActionButton/ActionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export function HomePage() {
  const { update } = useSettings();

  return (
    <Page
      footer={
        <ActionPanel>
          <Link to="/quote">
            <ActionButton
              priority="primary"
              onClick={() => {
                update({ replacedLetters: [] });
              }}
            >
              <FontAwesomeIcon icon={faPlay} size="2x" />
            </ActionButton>
          </Link>
        </ActionPanel>
      }
    >
      <Text>Hello there!</Text>
      <Text>
        This app is supposed to teach you to read Aurebesh, the language used in
        the Star Wars universe.
      </Text>
      <Text>
        Aurebesh is basically just a font, so you don't need to learn a whole
        new language to read it.
      </Text>
      <Text>You only need to memorize the alphabet.</Text>
      <Text>
        I'll give you some simple exercises to gradually learn the letters.
      </Text>
      <Text>
        It should be very easy: you will read quotes from Star Wars, and from
        time to time a new Aurebesh symbol will appear in them.
      </Text>
      <Text>You can adjust the learning speed if you feel out of temp.</Text>
      <Text>May the Force be with you.</Text>
    </Page>
  );
}
