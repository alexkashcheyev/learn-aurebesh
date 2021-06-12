import React from "react";
import { buildClassName } from "../utils";
import { TrainingWord } from "./TrainingWord";

interface TrainingTextProps {
  text?: string;
  testId?: string;
  replacedCharacters: string[];
  className?: string;
}

export function TrainingText({
  text,
  className,
  testId,
  replacedCharacters,
}: TrainingTextProps) {
  const textClass = buildClassName(["training-text", className]);
  const words = text?.split(" ");

  return text ? (
    <div data-testid={testId} className={textClass}>
      {words?.map((word, index) => (
        <TrainingWord
          value={word}
          replacedCharacters={replacedCharacters}
          key={index}
        />
      ))}
    </div>
  ) : (
    <div>Impossible. Perhaps the archives are incomplete.</div>
  );
}
