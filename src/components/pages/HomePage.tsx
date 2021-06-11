import React from 'react';
import { Page } from '../Page/Page';
import { Text } from '../Text/Text';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';

export function HomePage() {
  return <Page>
    <Text>Hello there!</Text>
    <Text>This app is supposed to teach you to read Aurebesh, the language from Star Wars universe.</Text>
    <Text>Since Aurebesh is just a font, you don't need to learn a whole new language, only to remember the alphabet.</Text>
    <Text>I'll give you some simple exercises to gradually learn the letters.</Text>
    <Text>It should be very easy: you will read quotes from Star Wars, and every next quote will have a new Aurebesh symbol in it.</Text>
    <Text>You can adjust the learning speed if you feel out of temp.</Text>
    <Text>May the Force be with you.</Text>
    <Link to="/quote"><Button>Start</Button></Link>
  </Page>
}