import Ajv, { JSONSchemaType } from 'ajv';

// schema validator, uses eval(...) under the hood
// must compile in backend or break CSP
const obj_validator = new Ajv();

export interface Check {
  _id: string;
  name: string;
  note: string;
  isEnabled: boolean;
  frequency: number;
  browserConfig: any;
  alertHistory: string[];
  tags: string[];
}

const CheckSchema: JSONSchemaType<Check> = {
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
    browserConfig: { $ref: '#BrowserConfigSchema' },
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

export const validateCheckObj = obj_validator.compile(CheckSchema);

export interface BrowserConfig {
  _id: string;
  url: string;
  checkText: boolean;
  checkHtml: boolean;
  checkScreenshot: boolean;
  locator: string;
}

const BrowserConfigSchema: JSONSchemaType<BrowserConfig> = {
  $id: '#BrowserConfigSchema',
  type: 'object',
  description: 'Config passed to browser for what to check',
  properties: {
    _id: { type: 'string' },
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
  required: ['_id', 'url'],
};

export const validateBrowserConfigObj =
  obj_validator.compile(BrowserConfigSchema);

export interface Alert {
  _id: string;
  html: string;
  screenshot: string;
  text: string;
  timestamp: string;
}

const AlertSchema: JSONSchemaType<Alert> = {
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

export const validateAlertObj = obj_validator.compile(AlertSchema);

export interface Tag {
  _id: number;
  name: string;
  color: string;
  note: string;
}

export enum TagColor {
  Red = '#FF0000',
  Green = '#00FF00',
  Blue = '#0000FF',
  // TODO: more colors or a color picker
}

const TagSchema: JSONSchemaType<Tag> = {
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

export const validateTagObj = obj_validator.compile(TagSchema);
