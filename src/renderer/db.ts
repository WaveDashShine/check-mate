import PouchDB from 'pouchdb';

const db = new PouchDB('CheckMate'); // stub
// pouchdb is stored in indexDB
// view via dev tools > application > storage

export default db;

// put a document: https://pouchdb.com/guides/documents.html

// ._rev concept
// https://pouchdb.com/guides/documents.html#understanding-revisions-rev
// need to grab the revision to update it

export type CheckConfig = {
  type: 'object';
  description: 'Check config object that is created via Form GUI';
  title: 'Check';
  properties: {
    _id: 'integer';
    name: string;
    note: string;
    is_enabled: {
      type: boolean;
      default: false;
      description: 'will the Check be done';
    };
    frequency: {
      type: 'integer';
      description: 'units seconds for starting the check';
      exclusiveMinimum: 1;
      default: 1;
    };
    browserConfig: { $ref: '#BrowserConfig' };
    alertHistory: {
      type: 'array';
      description: 'id list of history of alerts that have been checked';
      items: {
        type: 'integer';
      };
    };
    tags: {
      type: 'array';
      description: 'id list of history of tags attached to Check config';
      items: {
        type: 'integer';
      };
    };
  };
  required: ['_id', 'name'];
};

export type BrowserConfig = {
  $id: '#BrowserConfig';
  type: 'object';
  description: 'Config passed to browser for what to check';
  properties: {
    _id: 'integer'; // TODO: write the rest of this
    url: {
      type: 'uri';
      description: 'url to go to';
    };
    check_text_diff: {
      type: boolean;
      default: false;
      description: 'determines if we check text';
    };
    check_html_diff: {
      type: boolean;
      default: false;
      description: 'determines if we check html';
    };
    check_screenshot_diff: {
      // TODO: requires image comparison algorithm / library
      type: boolean;
      default: false;
      description: 'determines if we take a screenshot';
    };
    locator: {
      type: string;
      description: 'element locator to check for';
    };
  };
  required: ['_id', 'url'];
};

export type AlertConfig = {
  $id: '#AlertConfig';
  type: 'object';
  description: 'Alert belonging to a Check object';
  properties: {
    _id: 'integer';
    parent_id: {
      type: 'integer';
      description: 'parent id of the Alert - is a Check object';
    };
    html: {
      type: string;
      contentMediaType: 'text/html';
      description: 'result of the html comparison';
    };
    screenshot: {
      // TODO: find out how puppeteer stores image types
      type: string;
      contentEncoding: 'base64';
      contentMediaType: 'image/png';
      description: 'screenshot of the page';
    };
    text: {
      type: string;
      description: 'change in text of the locator';
    };
    timestamp: {
      type: 'date-time';
      description: 'timestamp of the alert';
    };
  };
  required: ['_id', 'parent_id', 'timestamp'];
};

export type TagConfig = {
  $id: '#TagConfig';
  type: 'object';
  description: 'tags for categorizing config objects';
  properties: {
    _id: 'integer';
    name: {
      type: 'string';
      description: 'name of the tag';
    };
    color: {
      type: string;
      description: 'hexcode of the tag color';
    };
    note: {
      type: string;
      description: 'any notes of the tag';
    };
  };
  required: ['_id', 'name', 'color'];
};
