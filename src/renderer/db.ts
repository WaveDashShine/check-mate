import { DbDocument, DbSchemaType, DbSchemaTypes } from 'src/schema/dbSchema';
import { CheckDb } from 'src/schema/check';
import { DiscoveryDb } from 'src/schema/discovery';
import { v4 as uuidv4 } from 'uuid';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';

PouchDB.plugin(PouchFind);

const db = new PouchDB('CheckMate');
// pouchdb is stored in indexDB
// view via dev tools > application > storage

// ._rev concept
// https://pouchdb.com/guides/documents.html#understanding-revisions-rev
// need to have revision in order to update doc
export function insert(doc: DbDocument, docType: DbSchemaType): string {
  if (doc._id === undefined || doc._id === '') {
    doc._id = uuidv4();
  } else if (doc._rev === undefined || doc._rev === '') {
    console.log('ABORTING: missing _rev even though _id exists', doc);
    return doc._id;
  }
  doc.type = docType;
  db.put(doc);
  console.log('inserted', doc);
  return doc._id;
}

export async function retrieve(docId: string): Promise<any> {
  return db
    .get(docId)
    .then((doc) => {
      const dbDoc = doc as DbDocument;
      if (dbDoc._deleted) {
        return undefined;
      }
      return doc;
    })
    .catch(() => {
      return undefined;
    });
}

export async function deleteDocs(docs: DbDocument[]) {
  if (docs.length > 0) {
    console.log('deleting', docs);
    for (const row of docs) {
      await remove(row._id, row._rev as string);
    }
  } else {
    throw new Error('No docs selected for deletion.');
  }
}

// TODO: delete all docs doesn't actually delete them
// they're just marked as deleted in the database
// TODO: need to replicate the database to actually purge the deleted docs
// TODO: need to also go through the list of existing checks and purge any discoveries that are dangling

async function remove(docId: string, revId: string) {
  if (
    docId === undefined ||
    docId === '' ||
    revId === undefined ||
    revId === ''
  ) {
    console.log('handle missing docId or revId');
    return undefined;
  }
  return db.remove(docId, revId).catch((e) => {
    console.error(e);
    return e;
  });
}

async function findAllDocWithType(docType: DbSchemaType): Promise<any[]> {
  const result = await db.find({
    selector: { type: docType },
  });
  console.log('findAll', result);
  return result.docs;
}

export async function getAllChecks(): Promise<CheckDb[]> {
  return findAllDocWithType(DbSchemaTypes.check);
}

export let getAllChecksCachePromise: Promise<CheckDb[]> = getAllChecks();

export function invalidateChecksCache() {
  getAllChecksCachePromise = getAllChecks();
}

export async function getAllDiscoveries(): Promise<DiscoveryDb[]> {
  return findAllDocWithType(DbSchemaTypes.discovery);
}

export let getAllDiscoveriesCachePromise: Promise<DiscoveryDb[]> =
  getAllDiscoveries();

export function invalidateDiscoveryCache() {
  getAllDiscoveriesCachePromise = getAllDiscoveries();
}
