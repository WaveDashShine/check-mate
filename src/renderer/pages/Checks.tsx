import 'src/renderer/pages/Checks.css';
import CheckForm from 'src/renderer/components/CheckForm';
import CheckHeader from 'src/renderer/components/CheckHeader';
import CheckTable from 'src/renderer/components/CheckTable';
import { useState } from 'react';
import { CheckDb, defaultCheckObj } from 'src/schema';

function testPuppeteer() {
  // stub - need to pass a config object
  const containerText = window.electron.autoBrowser.check(
    'https://electron-react-boilerplate.js.org/',
  );
  console.log('containerText', containerText);
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
        checkFunction={testPuppeteer}
      ></CheckHeader>
      <CheckForm
        isOpen={isOpenCheckForm}
        setIsOpen={setIsOpenCheckForm}
        dbFormValues={dbFormValues}
        isEdit={isEdit}
      ></CheckForm>
      <CheckTable
        searchValue={searchValue}
        setDbFormValues={setDbFormValues}
        setIsOpenCheckForm={setIsOpenCheckForm}
        setIsEdit={setIsEdit}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      ></CheckTable>
    </div>
  );
}

export default Checks;
