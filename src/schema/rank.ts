import { Static, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { DbSchema } from 'src/schema/dbSchema';

export const RankColor = {
  // TODO: make this chess themed instead
  // icon and color - white, black, brown, beige
  Red: '#FF0000',
  Green: '#00FF00',
  Blue: '#0000FF',
  // TODO: more colors or a color picker
} as const;

export const Piece = {
  pawn: 'pawn',
  bishop: 'bishop',
  knight: 'knight',
  rook: 'rook',
  queen: 'queen',
  king: 'king',
};

export const RankUiSchema = Type.Object({
  name: Type.String({
    minLength: 1,
  }),
  color: Type.Const(RankColor),
  piece: Type.Const(Piece),
  note: Type.Optional(Type.String()),
});

export type Rank = Static<typeof RankUiSchema>;

export const defaultRankObj: Rank = Value.Default(RankUiSchema, {
  name: '',
  piece: Piece.pawn,
}) as Rank;

export const RankUiAttr = {
  name: 'name',
  color: 'color',
  piece: 'piece',
  note: 'note',
} as const satisfies Record<keyof Rank, string>;

const RankDbSchema = Type.Composite([RankUiSchema, DbSchema]);
export type RankDb = Static<typeof RankDbSchema>;
