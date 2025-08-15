import { Static, Type } from '@sinclair/typebox';

/*
REFERENCE FOR DEFINING NEW SCHEMA
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
  discovery: 'discovery',
  check: 'check',
  rank: 'rank',
} as const;
// ValueOf similar to KeyOf implementation
export type ValueOf<T> = T[keyof T];
export type DbSchemaType = ValueOf<typeof DbSchemaTypes>;

export const DbSchema = Type.Object({
  _id: Type.String(),
  _rev: Type.Optional(Type.String()),
  type: Type.String(),
});

export type DbDocument = Static<typeof DbSchema>;
