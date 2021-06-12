import React from "react";
import { useSettings } from "../../domain/settings";
import { buildClassName } from "../utils";
import "./CheatSheet.scss";

interface CheatSheetProps {
  progress: number;
}

export function CheatSheet({ progress }: CheatSheetProps) {
  const { replacedLetters } = useSettings();

  const wrapperClass = buildClassName(["cheat-sheet-wrapper"]);
  const entryClass = buildClassName(["cheat-sheet-entry"]);
  const latinClass = buildClassName(["cheat-sheet-latin"]);
  const dividerClass = buildClassName(["cheat-sheet-divider"]);
  const aurebeshClass = buildClassName(["cheat-sheet-aurebesh"]);
  const progressbarClass = buildClassName(["cheat-sheet-progressbar"]);

  const letters = replacedLetters.slice(-3);

  return (
    <div className={wrapperClass}>
      {letters.map((letter, index) => (
        <div className={entryClass} key={index}>
          <div className={latinClass}>{letter.toUpperCase()}</div>
          <div className={dividerClass}>=</div>
          <div className={aurebeshClass}>{letter}</div>
        </div>
      ))}
      <div
        className={progressbarClass}
        style={{ width: `${progress * 100}%` }}
      ></div>
    </div>
  );
}
