import 'src/renderer/pages/Checks.css';
import CheckForm from 'src/renderer/components/CheckForm';
import CheckHeader from 'src/renderer/components/CheckHeader';
import { newButton, Button } from 'src/renderer/components/generic/Header';
import CheckTable from 'src/renderer/components/CheckTable';
import { useState } from 'react';
import {
  getAllChecksCachePromise,
  invalidateChecksCache,
} from 'src/renderer/db';
import { CheckDb } from 'src/schema/check';

function browserCheck(rows: CheckDb[]) {
  // stub - need to pass a config object
  for (const row of rows) {
    if (!row.isEnabled) {
      continue;
    }
    const containerText = window.electron.autoBrowser.check(row);
    // TODO: this needs to return an alert and save to DB
    console.log('containerText', containerText);
  }
}

function Checks() {
  const [isOpenCheckForm, setIsOpenCheckForm] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editFormValues, setEditFormValues] = useState<CheckDb>({} as CheckDb);
  const [selectedRows, setSelectedRows] = useState<CheckDb[]>([]);

  console.log('selected', selectedRows);
  const customTableHeaderButtons: Button[] = [
    newButton('Enable/Disable', () => {}, isOpenCheckForm),
  ];
  return (
    <div>
      Checks
      <CheckHeader
        setSearchValue={setSearchValue}
        setOpenForm={setIsOpenCheckForm}
        setIsEdit={setIsEdit}
        isOpenForm={isOpenCheckForm}
        checkFunction={browserCheck}
        selectedRows={selectedRows}
        customButtons={customTableHeaderButtons}
      ></CheckHeader>
      <CheckForm
        isOpen={isOpenCheckForm}
        setIsOpen={setIsOpenCheckForm}
        dbFormValues={editFormValues}
        isEdit={isEdit}
        invalidateCache={invalidateChecksCache}
      ></CheckForm>
      <CheckTable
        searchValue={searchValue}
        setEditFormValues={setEditFormValues}
        setIsOpenCheckForm={setIsOpenCheckForm}
        setIsEdit={setIsEdit}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        rowsPromise={getAllChecksCachePromise}
      ></CheckTable>
    </div>
  );
}

export default Checks;
