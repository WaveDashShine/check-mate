import { Static, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import StoreKeys from './storeConfig';

/*
- DbSchemaTypes = types of documents found in the database
- UiSchema is the ground truth for GUI validation
- static<typeof > is the actual Type that is exported (defined via TypeBox)
- DbSchema defines attributes that all DB objects should have
  - composite the UiSchema with DbSchema to create your DB object Type
- UiAttr contains the attribute keys that are registered to the form component
 via react form hook - avoids string literals
- defaultObj is the instantiated default Form object used by the GUI form
  - TypeBox will instantiate the object with values that MEET the min. requirements
  - override with default values that do not meet the min. requirements
 */
export const DbSchemaTypes = {
  alert: 'alert',
  check: 'check',
  tag: 'tag',
} as const;
// ValueOf similar to KeyOf implementation
export type ValueOf<T> = T[keyof T];
export type DbSchemaType = ValueOf<typeof DbSchemaTypes>;

const DbSchema = Type.Object({
  _id: Type.String(),
  _rev: Type.Optional(Type.String()),
  type: Type.String(),
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

export type Check = Static<typeof CheckUiSchema>;

export const defaultCheckObj: Check = Value.Default(CheckUiSchema, {
  name: '',
  browserConfig: { url: '' },
}) as Check;

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

export const AlertUiSchema = Type.Object({
  html: Type.Optional(
    Type.String({
      contentMediaType: 'text/html',
      description: 'html snapshot',
    }),
  ),
  screenshot: Type.Optional(
    Type.String({
      contentEncoding: 'base64',
      contentMode: 'image/png',
      description: 'screenshot of element',
    }),
  ),
  text: Type.Optional(
    Type.String({
      contentMediaType: 'text/plain',
      description: 'text of the located element',
    }),
  ),
  timestamp: Type.Date(),
});

export type Alert = Static<typeof AlertUiSchema>;

const AlertDbSchema = Type.Composite([AlertUiSchema, DbSchema]);
export type AlertDb = Static<typeof AlertDbSchema>;

export const TagColor = {
  Red: '#FF0000',
  Green: '#00FF00',
  Blue: '#0000FF',
  // TODO: more colors or a color picker
} as const;

export const TagUiSchema = Type.Object({
  name: Type.String({
    minLength: 1,
  }),
  color: Type.Const(TagColor),
  note: Type.Optional(Type.String()),
});

export type Tag = Static<typeof TagUiSchema>;

export const defaultTagObj: Tag = Value.Default(TagUiSchema, {
  name: '',
}) as Tag;

export const TagUiAttr = {
  name: 'name',
  color: 'color',
  note: 'note',
} as const satisfies Record<keyof Tag, string>;

const TagDbSchema = Type.Composite([TagUiSchema, DbSchema]);
export type TagDb = Static<typeof TagDbSchema>;
