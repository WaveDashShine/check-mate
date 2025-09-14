import CheckForm from 'src/renderer/components/CheckForm';
import CheckHeader from 'src/renderer/components/CheckHeader';
import Drawer from 'src/renderer/components/generic/Drawer';
import { Button, newButton } from 'src/renderer/components/generic/Header';
import CheckTable from 'src/renderer/components/CheckTable';
import { useState } from 'react';
import {
  deleteDocs,
  getAllChecksCachePromise,
  insert,
  invalidateChecksCache,
  invalidateDiscoveryCache,
  retrieve,
} from 'src/renderer/db';
import { CheckDb } from 'src/schema/check';
import { Discovery, DiscoveryDb } from 'src/schema/discovery';
import { DbSchemaTypes } from 'src/schema/dbSchema';

async function browserCheck(rows: CheckDb[]) {
  for (const row of rows) {
    if (!row.isEnabled) {
      continue;
    }

    // create new discovery
    const data: Discovery = window.electron.autoBrowser.check(row);
    const dbData = data as DiscoveryDb;
    const discoveryId: string = insert(dbData, DbSchemaTypes.discovery);

    // clear bad discovery references
    row.discoveryHistory = row.discoveryHistory || [];
    const validDocIds: string[] = [];
    for (const id of row.discoveryHistory) {
      const dbDoc = await retrieve(id);
      if (dbDoc !== undefined) {
        validDocIds.push(id);
      }
    }
    validDocIds.push(discoveryId);
    row.discoveryHistory = validDocIds;
    insert(row, DbSchemaTypes.check);
  }
  invalidateChecksCache();
  invalidateDiscoveryCache();
}

function Checks() {
  const [isOpenCheckForm, setIsOpenCheckForm] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editFormValues, setEditFormValues] = useState<CheckDb>({} as CheckDb);
  const [selectedRows, setSelectedRows] = useState<CheckDb[]>([]);

  const flipStatus = () => {
    for (const row of selectedRows) {
      row.isEnabled = !row.isEnabled;
      insert(row, DbSchemaTypes.check);
    }
    invalidateChecksCache();
    setSelectedRows([...selectedRows]);
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
      invalidateChecksCache();
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
            invalidateCache={invalidateChecksCache}
          />
        }
      />
      <CheckTable
        searchValue={searchValue}
        setEditFormValues={setEditFormValues}
        setIsOpenForm={setIsOpenCheckForm}
        setIsEdit={setIsEdit}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        rowsPromise={getAllChecksCachePromise}
      />
    </div>
  );
}

export default Checks;
