import React from 'react';
import { buildClassName } from '../utils';
import './CheatSheet.scss';

interface CheatSheetProps {
  letters: string[];
}

export function CheatSheet({letters}: CheatSheetProps) {
  const wrapperClass = buildClassName([
    'cheat-sheet-wrapper'
  ]);
  const entryClass = buildClassName([
    'cheat-sheet-entry'
  ]);
  const latinClass = buildClassName([
    'cheat-sheet-latin'
  ]);
  const dividerClass = buildClassName([
    'cheat-sheet-divider'
  ]);
  const aurebeshClass = buildClassName([
    'cheat-sheet-aurebesh'
  ]);

  return <div className={wrapperClass}>
    {letters.map((letter, index) =>
      <div className={entryClass} key={index}>
        <div className={latinClass}>{letter.toUpperCase()}</div>
        <div className={dividerClass}>=</div>
        <div className={aurebeshClass}>{letter}</div>
      </div>
    )}
  </div>
}