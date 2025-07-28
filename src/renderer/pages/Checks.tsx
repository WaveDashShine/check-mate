import 'src/renderer/pages/Checks.css';
import db from 'src/renderer/db';
import CheckForm from 'src/renderer/components/CheckForm';
import CheckHeader from 'src/renderer/components/CheckHeader';
import CheckTable from 'src/renderer/components/CheckTable';
import { useState } from 'react';
import { ICheck } from 'src/main/schemaValidator';

db.info().then(function (info) {
  console.log(info);
});

function testPuppeteer() {
  // stub - need to pass a config object
  const containerText = window.electron.autoBrowser.check(
    'https://electron-react-boilerplate.js.org/',
  );
  console.log('containerText', containerText);
}

function Checks() {
  const [isOpenCheckForm, setIsOpenCheckForm] = useState(false);
  const [rows, setRows] = useState<ICheck[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div>
      Checks
      {/* Checks button is a stub */}
      <button onClick={testPuppeteer}>Puppeteer Checks</button>
      <CheckHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setOpenCheckForm={setIsOpenCheckForm}
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
