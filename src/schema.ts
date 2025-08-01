import { Static, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

const DbSchema = Type.Object({
  _id: Type.String(),
  _rev: Type.Optional(Type.String()),
});

export type DbDocument = Static<typeof DbSchema>;

export const CheckUiSchema = Type.Object({
  name: Type.String({
    minLength: 1,
  }),
  note: Type.Optional(Type.String()),
  isEnabled: Type.Boolean({
    default: false,
    description: 'will the Check be done',
  }),
  frequency: Type.Integer({
    exclusiveMinimum: 1,
    default: 60,
    description: 'units seconds for polling the check',
  }),
  browserConfig: Type.Object({
    url: Type.String({
      minLength: 1,
    }),
    checkText: Type.Boolean({
      default: false,
    }),
    checkHtml: Type.Boolean({
      default: false,
    }),
    checkScreenshot: Type.Boolean({
      default: false,
    }),
    locator: Type.Optional(
      Type.String({
        description: 'element locator',
      }),
    ),
  }),
  alertHistory: Type.Array(Type.String(), {
    default: [],
    description: 'ID list of alerts that have been checked',
  }),
  tags: Type.Array(Type.String(), {
    default: [],
    description: 'ID list of tags',
  }),
});

// TypeBox will instantiate the object with values that MEET the minimum requirements
export const defaultCheckObj: Check = Value.Default(CheckUiSchema, {
  name: '',
  browserConfig: { url: '' },
}) as Check;

export type Check = Static<typeof CheckUiSchema>;

export const CheckUiAttr = {
  name: 'name',
  note: 'note',
  isEnabled: 'isEnabled',
  frequency: 'frequency',
  browserConfig: {
    url: 'browserConfig.url',
    checkText: 'browserConfig.checkText',
    checkHtml: 'browserConfig.checkHtml',
    checkScreenshot: 'browserConfig.checkScreenshot',
    locator: 'browserConfig.locator',
  },
  alertHistory: 'alertHistory',
  tags: 'tags',
} as const satisfies Record<keyof Check, string | object>;

const CheckDbSchema = Type.Composite([CheckUiSchema, DbSchema]);
export type CheckDb = Static<typeof CheckDbSchema>;

// TODO: convert the following to follow TypeBox conventions
export interface IAlert {
  _id: string;
  html: string;
  screenshot: string;
  text: string;
  timestamp: string;
}

export interface ITag {
  _id: number;
  name: string;
  color: string;
  note: string;
}

export const TagColor = {
  Red: '#FF0000',
  Green: '#00FF00',
  Blue: '#0000FF',
  // TODO: more colors or a color picker
} as const;

// const AlertSchema: JSONSchemaType<IAlert> = {
//   $id: '#AlertSchema',
//   type: 'object',
//   description: 'Alert belonging to a Check object',
//   properties: {
//     _id: { type: 'string' },
//     html: {
//       type: 'string',
//       contentMediaType: 'text/html',
//       description: 'result of the html comparison',
//     },
//     screenshot: {
//       type: 'string',
//       contentEncoding: 'base64',
//       contentMediaType: 'image/png',
//       description: 'screenshot of the page',
//     },
//     text: {
//       type: 'string',
//       description: 'change in text of the locator',
//     },
//     timestamp: {
//       type: 'string',
//       format: 'date-time',
//       description: 'timestamp of the alert',
//     },
//   },
//   required: ['_id', 'timestamp'],
// };
//
// const TagSchema: JSONSchemaType<ITag> = {
//   $id: '#TagSchema',
//   type: 'object',
//   description: 'tags for categorizing config objects',
//   properties: {
//     _id: { type: 'integer' },
//     name: {
//       type: 'string',
//       description: 'name of the tag',
//     },
//     color: {
//       type: 'string',
//       enum: [TagColor.Red, TagColor.Green, TagColor.Blue],
//       description: 'tag color',
//     },
//     note: {
//       type: 'string',
//       description: 'any notes of the tag',
//     },
//   },
//   required: ['_id', 'name', 'color'],
// };
