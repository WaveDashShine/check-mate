import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);
import { CheckDb, DbDocument, DbSchemaTypes } from 'src/schema';
import { v4 as uuidv4 } from 'uuid';
import { DbSchemaType } from 'src/schema';

const db = new PouchDB('CheckMate');
// pouchdb is stored in indexDB
// view via dev tools > application > storage

export function insert(obj: DbDocument, docType: DbSchemaType) {
  if (obj._id == undefined || obj._id == '') {
    obj._id = uuidv4();
  }
  obj.type = docType;
  db.put(obj);
  console.log('inserted', obj);
}

// ._rev concept
// https://pouchdb.com/guides/documents.html#understanding-revisions-rev
// need to grab the revision to update it
export function update(doc: DbDocument) {
  // stub
}

async function findAllDocWithType(docType: DbSchemaType): Promise<Array<any>> {
  await db
    .find({ selector: { type: docType } })
    .then(function (result) {
      const docs = result;
      console.log(result);
      return docs;
    })
    .catch(function (error) {
      console.log(error);
    });
  return []; // TODO: how to handle error?
}

export async function getAllChecks(): Promise<CheckDb[]> {
  return await findAllDocWithType(DbSchemaTypes.check);
}
