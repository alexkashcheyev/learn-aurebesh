import React from 'react';
import { buildClassName } from '../utils';
import './TrainingText.scss';

interface TrainingCharacterProps {
  character: string,
  aurebesh: boolean;
}

export function TrainingCharacter({character, aurebesh}: TrainingCharacterProps) {
  const className = buildClassName([
    'training-character',
    aurebesh ? 'aurebesh' : 'latin',
  ]);

  return <div className={className}>
    {character}
  </div>
}