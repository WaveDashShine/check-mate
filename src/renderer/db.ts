import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);
import { DbDocument, DbSchemaTypes } from 'src/schema/dbSchema';
import { v4 as uuidv4 } from 'uuid';
import { DbSchemaType } from 'src/schema/dbSchema';
import FindResponse = PouchDB.Find.FindResponse;
import { CheckDb } from 'src/schema/check';

const db = new PouchDB('CheckMate');
// pouchdb is stored in indexDB
// view via dev tools > application > storage

// ._rev concept
// https://pouchdb.com/guides/documents.html#understanding-revisions-rev
// need to have revision in order to update doc
export function insert(doc: DbDocument, docType: DbSchemaType) {
  if (doc._id === undefined || doc._id === '') {
    doc._id = uuidv4();
  } else {
    if (doc._rev === undefined || doc._rev === '') {
      console.log('ABORTING: missing _rev even though _id exists', doc);
      return;
    }
  }
  doc.type = docType;
  db.put(doc);
  console.log('inserted', doc);
}

async function findAllDocWithType(docType: DbSchemaType): Promise<any[]> {
  const result: FindResponse<any> = await db.find({
    selector: { type: docType },
  });
  console.log('findAll', result);
  return result.docs;
}

export async function getAllChecks(): Promise<CheckDb[]> {
  return await findAllDocWithType(DbSchemaTypes.check);
}

export let getAllChecksCachePromise: Promise<CheckDb[]> = getAllChecks();

export function invalidateChecksCache() {
  getAllChecksCachePromise = getAllChecks();
}
