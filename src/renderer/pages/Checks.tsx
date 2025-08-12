import 'src/renderer/pages/Checks.css';
import CheckForm from 'src/renderer/components/CheckForm';
import CheckHeader from 'src/renderer/components/CheckHeader';
import CheckTable from 'src/renderer/components/CheckTable';
import { useState } from 'react';

function testPuppeteer() {
  // stub - need to pass a config object
  const containerText = window.electron.autoBrowser.check(
    'https://electron-react-boilerplate.js.org/',
  );
  console.log('containerText', containerText);
}

function Checks() {
  const [isOpenCheckForm, setIsOpenCheckForm] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);

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
        dbFormValues={undefined}
        isEdit={isEdit}
      ></CheckForm>
      <CheckTable searchValue={searchValue}></CheckTable>
    </div>
  );
}

export default Checks;
