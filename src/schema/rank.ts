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
  whitePawn: 'p',
  blackPawn: 'o',
  whiteKnight: 'n',
  blackKnight: 'm',
  whiteBishop: 'b',
  blackBishop: 'v',
  whiteRook: 'r',
  blackRook: 't',
  whiteQueen: 'q',
  blackQueen: 'w',
  whiteKing: 'k',
  blackKing: 'l',
};

export const RankUiSchema = Type.Object({
  name: Type.String({
    minLength: 1,
  }),
  color: Type.Const(RankColor),
  piece: Type.Enum(Piece),
  note: Type.Optional(Type.String()),
});

export type Rank = Static<typeof RankUiSchema>;

export const defaultRankObj: Rank = Value.Default(RankUiSchema, {
  name: '',
  piece: Piece.whitePawn,
}) as Rank;

export const RankUiAttr = {
  name: 'name',
  color: 'color',
  piece: 'piece',
  note: 'note',
} as const satisfies Record<keyof Rank, string>;

const RankDbSchema = Type.Composite([RankUiSchema, DbSchema]);
export type RankDb = Static<typeof RankDbSchema>;
