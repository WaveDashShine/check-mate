import PouchDB from 'pouchdb';

const db = new PouchDB('CheckMate'); // stub
// pouchdb is stored in indexDB
// view via dev tools > application > storage

export default db;

// put a document: https://pouchdb.com/guides/documents.html

// ._rev concept
// https://pouchdb.com/guides/documents.html#understanding-revisions-rev
// need to grab the revision to update it
