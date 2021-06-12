import { buildClassName } from "../utils";
import { TrainingCharacter } from "./TrainingCharacter";

interface TrainingWordProps {
  value: string;
  replacedCharacters: string[];
}

export function TrainingWord({ value, replacedCharacters }: TrainingWordProps) {
  const chars = value.split('');
  const className = buildClassName([
    'training-word'
  ]);

  return <div className={className}>
    {chars.map(
      (char, index) => <TrainingCharacter
        character={char}
        aurebesh={replacedCharacters.includes(char.toLowerCase())} 
        key={index}
      />
    )}
  </div>
}