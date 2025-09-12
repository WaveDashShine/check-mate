import CheckForm from 'src/renderer/components/CheckForm';
import CheckHeader from 'src/renderer/components/CheckHeader';
import Drawer from 'src/renderer/components/generic/Drawer';
import { newButton, Button } from 'src/renderer/components/generic/Header';
import CheckTable from 'src/renderer/components/CheckTable';
import { useState } from 'react';
import {
  getAllChecksCachePromise,
  insert,
  invalidateChecksCache,
  invalidateDiscoveryCache,
  deleteDocs,
} from 'src/renderer/db';
import { CheckDb } from 'src/schema/check';
import { Discovery, DiscoveryDb } from 'src/schema/discovery';
import { DbSchemaTypes } from 'src/schema/dbSchema';

function browserCheck(rows: CheckDb[]) {
  for (const row of rows) {
    if (!row.isEnabled) {
      continue;
    }
    const data: Discovery = window.electron.autoBrowser.check(row);
    const dbData = data as DiscoveryDb;
    const discoveryId: string = insert(dbData, DbSchemaTypes.discovery);
    row.discoveryHistory = row.discoveryHistory || [];
    row.discoveryHistory.push(discoveryId);
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
      name: 'Copy of ' + row.name,
      discoveryHistory: [],
    });
    setIsOpenCheckForm(true);
  };
  const customTableHeaderButtons: Button[] = [
    newButton('Enable/Disable', flipStatus, selectedRows.length < 1),
    newButton('Copy', copyRow, selectedRows.length < 1),
  ];
  const deleteSelectedRows = async () => {
    await deleteDocs(selectedRows).then(() => {
      setSelectedRows([]);
      invalidateChecksCache();
    });
  };
  return (
    <div>
      <span className={'m-2'}></span>
      <CheckHeader
        setSearchValue={setSearchValue}
        setOpenForm={setIsOpenCheckForm}
        setIsEdit={setIsEdit}
        isOpenForm={isOpenCheckForm}
        checkFunction={browserCheck}
        selectedRows={selectedRows}
        customButtons={customTableHeaderButtons}
        isCreateable={true}
        delete={() => deleteSelectedRows()}
      ></CheckHeader>
      <Drawer
        isOpen={isOpenCheckForm}
        onClose={() => setIsOpenCheckForm(false)}
        children={
          <CheckForm
            isOpen={isOpenCheckForm}
            setIsOpen={setIsOpenCheckForm}
            dbFormValues={editFormValues}
            isEdit={isEdit}
            invalidateCache={invalidateChecksCache}
          ></CheckForm>
        }
      ></Drawer>
      <CheckTable
        searchValue={searchValue}
        setEditFormValues={setEditFormValues}
        setIsOpenForm={setIsOpenCheckForm}
        setIsEdit={setIsEdit}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        rowsPromise={getAllChecksCachePromise}
      ></CheckTable>
    </div>
  );
}

export default Checks;
