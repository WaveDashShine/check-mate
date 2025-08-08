import 'src/renderer/components/CheckTable.css';
import { Check, CheckDb } from 'src/schema';
import { getAllChecks } from 'src/renderer/db';
import { Suspense, use } from 'react';

interface CheckTableProps {
  searchValue: string;
}

interface RowProps extends CheckTableProps {
  rowsPromise: Promise<CheckDb[]>;
}

function CheckTable(props: CheckTableProps) {
  const rows: Promise<CheckDb[]> = getAllChecks();
  return (
    <div style={{ padding: '16px', fontFamily: 'Arial, sans-serif' }}>
      <table>
        <thead>
          <tr>
            <th>Enabled</th>
            <th>Name</th>
            <th>Note</th>
            <th>Last Checked</th>
            <th>Tags</th>
          </tr>
        </thead>
        <Suspense
          fallback={
            <tbody>
              <tr>
                <td>Loading Rows...</td>
              </tr>
            </tbody>
          }
        >
          <Rows rowsPromise={rows} searchValue={props.searchValue}></Rows>
        </Suspense>
      </table>
    </div>
  );
}

export default CheckTable;

// https://react.dev/reference/rsc/server-components#async-components-with-server-components
function Rows(props: RowProps) {
  const rows: CheckDb[] = use(props.rowsPromise);
  const filteredRows: CheckDb[] = rows.filter((row) =>
    row.name.toLowerCase().includes(props.searchValue.toLowerCase()),
  );
  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row._id}>
          <td>{row.isEnabled ? '✅' : '❌'}</td>
          <td>{row.name}</td>
          <td>{row.note}</td>
          <td>{'TODO grab last checked from history'}</td>
          <td>{'TODO: grab tags'}</td>
        </tr>
      ))}
    </tbody>
  );
}
