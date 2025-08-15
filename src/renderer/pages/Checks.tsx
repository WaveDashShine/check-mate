import 'src/renderer/pages/Checks.css';
import CheckForm from 'src/renderer/components/CheckForm';
import CheckHeader from 'src/renderer/components/CheckHeader';
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
  const [dbFormValues, setDbFormValues] = useState<CheckDb>({} as CheckDb);
  const [selectedRows, setSelectedRows] = useState<CheckDb[]>([]);

  console.log('selected', selectedRows);

  return (
    <div>
      Checks
      <CheckHeader
        setSearchValue={setSearchValue}
        setOpenCheckForm={setIsOpenCheckForm}
        setIsEdit={setIsEdit}
        isDisabled={isOpenCheckForm}
        checkFunction={browserCheck}
        selectedRows={selectedRows}
      ></CheckHeader>
      <CheckForm
        isOpen={isOpenCheckForm}
        setIsOpen={setIsOpenCheckForm}
        dbFormValues={dbFormValues}
        isEdit={isEdit}
        invalidateCache={invalidateChecksCache}
      ></CheckForm>
      <CheckTable
        searchValue={searchValue}
        setDbFormValues={setDbFormValues}
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
