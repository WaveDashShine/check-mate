import 'src/renderer/pages/Checks.css';
import CheckForm from 'src/renderer/components/CheckForm';
import CheckHeader from 'src/renderer/components/CheckHeader';
import CheckTable from 'src/renderer/components/CheckTable';
import { useState } from 'react';
import { Check } from 'src/schema';

function testPuppeteer() {
  // stub - need to pass a config object
  const containerText = window.electron.autoBrowser.check(
    'https://electron-react-boilerplate.js.org/',
  );
  console.log('containerText', containerText);
}

function Checks() {
  const [isOpenCheckForm, setIsOpenCheckForm] = useState(false);
  const [rows, setRows] = useState<Check[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div>
      Checks
      <CheckHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setOpenCheckForm={setIsOpenCheckForm}
        checkFunction={testPuppeteer}
      ></CheckHeader>
      <CheckForm
        isOpen={isOpenCheckForm}
        setIsOpen={setIsOpenCheckForm}
      ></CheckForm>
      <CheckTable rows={searchValue ? filteredRows : rows}></CheckTable>
    </div>
  );
}

export default Checks;
