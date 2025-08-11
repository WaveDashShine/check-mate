import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);
import { CheckDb, DbDocument, DbSchemaTypes } from 'src/schema';
import { v4 as uuidv4 } from 'uuid';
import { DbSchemaType } from 'src/schema';
import FindResponse = PouchDB.Find.FindResponse;

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

async function findAllDocWithType(docType: DbSchemaType): Promise<any[]> {
  try {
    const result: FindResponse<any> = await db.find({
      selector: { type: docType },
    });
    console.log('findAll', result);
    return result.docs;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAllChecks(): Promise<CheckDb[]> {
  return await findAllDocWithType(DbSchemaTypes.check);
}
