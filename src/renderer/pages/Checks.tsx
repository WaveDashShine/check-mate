import 'src/renderer/pages/Checks.css';
import db from 'src/renderer/db';
import CheckTable from 'src/renderer/components/CheckTable';

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
  return (
    <div>
      Checks
      <button onClick={testPuppeteer}>Puppeteer Checks</button>
      <CheckTable></CheckTable>
    </div>
  );
}

export default Checks;
