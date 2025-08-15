import 'src/renderer/components/CheckTable.css';
import { Suspense, use } from 'react';
import { CheckDb } from 'src/schema/check';

interface CheckTableProps {
  searchValue: string;
  setDbFormValues: (dbFormValues: CheckDb) => void;
  setIsOpenCheckForm: (isOpen: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  selectedRows: CheckDb[];
  setSelectedRows: (selectedRows: CheckDb[]) => void;
  rowsPromise: Promise<CheckDb[]>;
}

interface CheckRowProps extends CheckTableProps {}

function CheckTable(props: CheckTableProps) {
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
          <CheckRows {...props}></CheckRows>
        </Suspense>
      </table>
    </div>
  );
}

export default CheckTable;

// https://react.dev/reference/rsc/server-components#async-components-with-server-components
function CheckRows(props: CheckRowProps) {
  const rows: CheckDb[] = use(props.rowsPromise);
  const filteredRows: CheckDb[] = rows.filter((row) =>
    row.name.toLowerCase().includes(props.searchValue.toLowerCase()),
  );
  const displayedRows: CheckDb[] =
    props.searchValue == '' || props.searchValue == null ? rows : filteredRows;
  // console.log('rows', rows);
  // console.log('filteredRows', filteredRows);
  console.log('displayedRows', displayedRows);

  const handleEditRow = (row: CheckDb) => {
    props.setDbFormValues(row);
    props.setIsOpenCheckForm(true);
    props.setIsEdit(true);
  };

  return (
    <tbody>
      {displayedRows.map((row: CheckDb) => (
        <tr
          key={row._id}
          onDoubleClick={() => {
            handleEditRow(row);
          }}
        >
          <td>
            <input
              type="checkbox"
              onChange={(e) => {
                const isChecked: boolean = e.target.checked;
                if (isChecked) {
                  props.setSelectedRows([...props.selectedRows, row]);
                } else {
                  props.setSelectedRows(
                    props.selectedRows.filter((r: CheckDb) => {
                      return r._id !== row._id;
                    }),
                  );
                }
              }}
            />
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
