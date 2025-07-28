import Ajv, { JSONSchemaType } from 'ajv';
import { ICheck, IAlert, ITag, TagColor } from 'src/schema';

// schema validator, uses eval(...) under the hood
// must compile in backend or break CSP
const validator = new Ajv();

const CheckSchema: JSONSchemaType<ICheck> = {
  type: 'object',
  $id: '#CheckSchema',
  description: 'Check config object that is created via Form GUI',
  title: 'Check',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string' },
    note: { type: 'string' },
    isEnabled: {
      type: 'boolean',
      default: false,
      description: 'will the Check be done',
    },
    frequency: {
      type: 'integer',
      description: 'units seconds for starting the check',
      exclusiveMinimum: 1,
      default: 1,
    },
    browserConfig: {
      type: 'object',
      description: 'Config passed to browser for what to check',
      properties: {
        url: {
          type: 'string',
          format: 'uri',
          description: 'url to go to',
        },
        checkText: {
          type: 'boolean',
          default: false,
          description: 'determines if we check text',
        },
        checkHtml: {
          type: 'boolean',
          default: false,
          description: 'determines if we check html',
        },
        checkScreenshot: {
          // TODO: requires image comparison algorithm / library
          type: 'boolean',
          default: false,
          description: 'determines if we take a screenshot',
        },
        locator: {
          type: 'string',
          description: 'element locator to check for',
        },
      },
      required: ['url'],
    },
    alertHistory: {
      type: 'array',
      description: 'id list of history of alerts that have been checked',
      default: [],
      items: {
        type: 'string',
      },
    },
    tags: {
      type: 'array',
      description: 'id list of history of tags attached to Check config',
      default: [],
      items: {
        type: 'string',
      },
    },
  },
  required: ['_id', 'name'],
};

export const validateCheckObj = validator.compile(CheckSchema);

const AlertSchema: JSONSchemaType<IAlert> = {
  $id: '#AlertSchema',
  type: 'object',
  description: 'Alert belonging to a Check object',
  properties: {
    _id: { type: 'string' },
    html: {
      type: 'string',
      contentMediaType: 'text/html',
      description: 'result of the html comparison',
    },
    screenshot: {
      type: 'string',
      contentEncoding: 'base64',
      contentMediaType: 'image/png',
      description: 'screenshot of the page',
    },
    text: {
      type: 'string',
      description: 'change in text of the locator',
    },
    timestamp: {
      type: 'string',
      format: 'date-time',
      description: 'timestamp of the alert',
    },
  },
  required: ['_id', 'timestamp'],
};

export const validateAlertObj = validator.compile(AlertSchema);

const TagSchema: JSONSchemaType<ITag> = {
  $id: '#TagSchema',
  type: 'object',
  description: 'tags for categorizing config objects',
  properties: {
    _id: { type: 'integer' },
    name: {
      type: 'string',
      description: 'name of the tag',
    },
    color: {
      type: 'string',
      enum: [TagColor.Red, TagColor.Green, TagColor.Blue],
      description: 'tag color',
    },
    note: {
      type: 'string',
      description: 'any notes of the tag',
    },
  },
  required: ['_id', 'name', 'color'],
};

export const validateTagObj = validator.compile(TagSchema);
