import { Static, Type } from '@sinclair/typebox';
import { DbSchema } from 'src/schema/dbSchema';

export const DiscoveryUiSchema = Type.Object({
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
export type Discovery = Static<typeof DiscoveryUiSchema>;
export const DiscoveryUiAttr = {
  html: 'html',
  screenshot: 'screenshot',
  text: 'text',
  timestamp: 'timestamp',
} as const satisfies Record<keyof Discovery, string | object>;
const DiscoveryDbSchema = Type.Composite([DiscoveryUiSchema, DbSchema]);
export type DiscoveryDb = Static<typeof DiscoveryDbSchema>;
