import { Static, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { DbSchema } from './dbSchema';

export const CheckUiSchema = Type.Object({
  name: Type.String({
    minLength: 1,
  }),
  note: Type.Optional(Type.String()),
  isEnabled: Type.Boolean({
    default: false,
    description: 'will the Check be done',
  }),
  frequency: Type.String({
    minLength: 1,
    default: '60',
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
    locator: Type.String({
      description: 'element locator',
      minLength: 1,
    }),
  }),
  discoveryHistory: Type.Array(Type.String(), {
    default: [],
    description: 'ID list of alerts that have been checked',
  }),
  ranks: Type.Array(Type.String(), {
    default: [],
    description: 'ID list of ranks',
  }),
});
export type Check = Static<typeof CheckUiSchema>;
export const defaultCheckObj: Check = Value.Default(CheckUiSchema, {
  name: '',
  browserConfig: { url: '' },
  locator: '',
  discoveryHistory: [],
  ranks: [],
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
  discoveryHistory: 'discoveryHistory',
  ranks: 'ranks',
} as const satisfies Record<keyof Check, string | object>;
const CheckDbSchema = Type.Composite([CheckUiSchema, DbSchema]);
export type CheckDb = Static<typeof CheckDbSchema>;
