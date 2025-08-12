import 'src/renderer/components/CheckTable.css';
import { Check, CheckDb, DbSchemaTypes } from 'src/schema';
import { getAllChecks } from 'src/renderer/db';
import { Suspense, use } from 'react';

interface CheckTableProps {
  searchValue: string;
  setDbFormValues: (dbFormValues: CheckDb) => void;
  setIsOpenCheckForm: (isOpen: boolean) => void;
}

interface CheckRowProps extends CheckTableProps {
  rowsPromise: Promise<CheckDb[]>;
}

function CheckTable(props: CheckTableProps) {
  const rowsPromise: Promise<CheckDb[]> = getAllChecks();
  return (
    <div style={{ padding: '16px', fontFamily: 'Arial, sans-serif' }}>
      <table>
        <thead>
          <tr>
            <th></th>
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
          <CheckRows
            rowsPromise={rowsPromise}
            searchValue={props.searchValue}
            setDbFormValues={props.setDbFormValues}
            setIsOpenCheckForm={props.setIsOpenCheckForm}
          ></CheckRows>
        </Suspense>
      </table>
    </div>
  );
}

export default CheckTable;

// https://react.dev/reference/rsc/server-components#async-components-with-server-components
function CheckRows(props: CheckRowProps) {
  const rows: CheckDb[] = use(props.rowsPromise);
  // TODO: rewrite this component so it doesn't query db every time search value is updated
  const filteredRows: CheckDb[] = rows.filter((row) =>
    row.name.toLowerCase().includes(props.searchValue.toLowerCase()),
  );
  const displayedRows: CheckDb[] =
    props.searchValue == '' || props.searchValue == null ? rows : filteredRows;
  console.log('rows', rows);
  console.log('filteredRows', filteredRows);
  console.log('displayedRows', displayedRows);
  return (
    <tbody>
      {displayedRows.map((row) => (
        <tr
          key={row._id}
          onDoubleClick={() => {
            props.setDbFormValues(row);
            props.setIsOpenCheckForm(true);
          }}
        >
          <td>
            <input type="checkbox" />
          </td>
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
