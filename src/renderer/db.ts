import PouchDB from 'pouchdb';
import { DbDocument } from 'src/schema';
import { v4 as uuidv4 } from 'uuid';

const db = new PouchDB('CheckMate');
// pouchdb is stored in indexDB
// view via dev tools > application > storage

interface IStatus {
  status: number;
  message: string;
}

export const status = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export function insert(obj: DbDocument): IStatus {
  if (obj._id == undefined || obj._id == '') {
    obj._id = uuidv4();
  }
  db.put(obj);
  console.log('inserted', obj);
  return {
    status: 200,
    message: 'Successfully inserted!',
  };
}

// ._rev concept
// https://pouchdb.com/guides/documents.html#understanding-revisions-rev
// need to grab the revision to update it
