import { SelectHTMLAttributes } from 'react';
import { Piece } from 'src/schema/rank';

interface PieceSelectorProps extends SelectHTMLAttributes<HTMLSelectElement> {
  register: any; // used by react hook form
  id: string;
}

function PieceSelector({ register, id }: PieceSelectorProps) {
  const keyValues: [string, string][] = Object.entries(Piece);
  return (
    <select id={id} {...register} type="text" className="chess-icons">
      {keyValues.map(([key, value]: [string, string]) => (
        <option value={value} className={key}>
          {value}
        </option>
      ))}
    </select>
  );
}

export default PieceSelector;
