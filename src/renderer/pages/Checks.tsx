import CheckForm from 'src/renderer/components/CheckForm';
import CheckHeader from 'src/renderer/components/CheckHeader';
import Drawer from 'src/renderer/components/generic/Drawer';
import { Button, newButton } from 'src/renderer/components/generic/Header';
import CheckTable from 'src/renderer/components/CheckTable';
import { Suspense, use, useState } from 'react';
import {
  deleteDocs,
  getAllChecks,
  insert,
  retrieve,
  update,
} from 'src/renderer/db';
import { CheckDb } from 'src/schema/check';
import { Discovery, DiscoveryDb } from 'src/schema/discovery';
import { DbDocument, DbSchemaTypes } from 'src/schema/dbSchema';
import { invalidateDiscoveryCache } from 'src/renderer/components/Discoveries';

let getChecksPromise: Promise<any[]> = getAllChecks();

export function invalidateChecks() {
  getChecksPromise = getAllChecks(); // clears the cache so next call refetches
}

async function cleanDiscoveryHistory(row: CheckDb) {
  row.discoveryHistory = row.discoveryHistory || [];
  const validDocIds: string[] = [];
  const discoveryPromises: Promise<DbDocument>[] = [];
  row.discoveryHistory.forEach((id) => {
    discoveryPromises.push(retrieve(id));
  });
  await Promise.all(discoveryPromises)
    .then((docList: DbDocument[]) => {
      return docList.forEach((doc: DbDocument) => {
        if (doc !== undefined) {
          validDocIds.push(doc._id);
        }
      });
    })
    .catch((err) => {
      return err;
    });
  row.discoveryHistory = validDocIds;
}

async function browserCheck(rows: CheckDb[]) {
  const rowsPromises: Promise<void>[] = [];
  rows.forEach((row: CheckDb) => {
    if (row.isEnabled) {
      // create new discovery
      const data: Discovery = window.electron.autoBrowser.check(row);
      const dbData = data as DiscoveryDb;
      const discoveryId: string = insert(dbData, DbSchemaTypes.discovery);
      row.discoveryHistory.push(discoveryId);
      insert(row, DbSchemaTypes.check);
      rowsPromises.push(cleanDiscoveryHistory(row));
    }
  });
  // clear bad discovery references
  await Promise.all(rowsPromises);
  invalidateChecks();
  invalidateDiscoveryCache();
}

function Checks() {
  const [isOpenCheckForm, setIsOpenCheckForm] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editFormValues, setEditFormValues] = useState<CheckDb>({} as CheckDb);
  const [selectedRows, setSelectedRows] = useState<CheckDb[]>([]);
  const rows: CheckDb[] = use(getChecksPromise);

  const flipStatus = () => {
    selectedRows.forEach((row: CheckDb) => {
      row.isEnabled = !row.isEnabled;
      update(row);
    });
    invalidateChecks();
    setSelectedRows([]);
  };
  const copyRow = () => {
    if (selectedRows.length !== 1) {
      return;
    }
    const row: CheckDb = selectedRows[0];
    setEditFormValues({
      ...row,
      _id: '',
      _rev: undefined,
      name: `Copy of ${row.name}`,
      discoveryHistory: [],
    });
    setIsOpenCheckForm(true);
  };
  const customTableHeaderButtons: Button[] = [
    newButton('Enable/Disable', flipStatus, selectedRows.length < 1),
    newButton('Copy', copyRow, selectedRows.length < 1),
  ];
  const deleteSelectedRows = async () => {
    await deleteDocs(selectedRows).then((result) => {
      setSelectedRows([]);
      invalidateChecks();
      return result;
    });
  };
  return (
    <div>
      <span className="m-2" />
      <CheckHeader
        setSearchValue={setSearchValue}
        setOpenForm={setIsOpenCheckForm}
        setIsEdit={setIsEdit}
        isOpenForm={isOpenCheckForm}
        checkFunction={browserCheck}
        selectedRows={selectedRows}
        customButtons={customTableHeaderButtons}
        isCreateable
        deleteSelected={() => deleteSelectedRows()}
      />
      <Drawer
        isOpen={isOpenCheckForm}
        onClose={() => setIsOpenCheckForm(false)}
        content={
          <CheckForm
            isOpen={isOpenCheckForm}
            setIsOpen={setIsOpenCheckForm}
            dbFormValues={editFormValues}
            isEdit={isEdit}
            invalidateCache={invalidateChecks}
          />
        }
      />
      <Suspense fallback={<p>Loading...</p>}>
        <CheckTable
          searchValue={searchValue}
          setEditFormValues={setEditFormValues}
          setIsOpenForm={setIsOpenCheckForm}
          setIsEdit={setIsEdit}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          rows={rows}
        />
      </Suspense>
    </div>
  );
}

export default Checks;
