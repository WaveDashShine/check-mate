import { SelectHTMLAttributes } from 'react';
import { Piece } from 'src/schema/rank';

interface PieceSelectorProps extends SelectHTMLAttributes<HTMLSelectElement> {
  register: any; // used by react hook form
  id: string;
}

function PieceSelector({ register, id }: PieceSelectorProps) {
  return (
    <select id={id} {...register} type="text" className="chess-icons">
      <option value="White Pawn">{Piece.whitePawn}</option>
      <option value="Black Pawn">{Piece.blackPawn}</option>
      <option value="White Knight">{Piece.whiteKnight}</option>
      <option value="Black Knight">{Piece.blackKnight}</option>
      <option value="White Bishop">{Piece.whiteBishop}</option>
      <option value="Black Bishop">{Piece.blackBishop}</option>
      <option value="White Rook">{Piece.whiteRook}</option>
      <option value="Black Rook">{Piece.blackRook}</option>
      <option value="White Queen">{Piece.whiteQueen}</option>
      <option value="Black Queen">{Piece.blackQueen}</option>
      <option value="White King">{Piece.whiteKing}</option>
      <option value="Black King">{Piece.blackKing}</option>
    </select>
  );
}

export default PieceSelector;
