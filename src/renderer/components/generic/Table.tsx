import { Suspense, use, ReactNode } from 'react';
import { DbDocument } from 'src/schema/dbSchema';

export type ColumnMap<T> = {
  key: keyof T;
  header: string;
  displayData: (row: T) => ReactNode;
};

export interface GenericTableProps {
  searchValue: string;
  setIsOpenForm: (isOpen: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  // types are generic here
  setEditFormValues: (editFormValues: any) => void;
  selectedRows: any[];
  setSelectedRows: (selectedRows: any[]) => void;
  rowsPromise: Promise<DbDocument[]>;
}

interface TableProps extends GenericTableProps {
  columnMapping: ColumnMap<any>[];
}

// https://react.dev/reference/rsc/server-components#async-components-with-server-components
function Table(props: TableProps) {
  const rows: DbDocument[] = use(props.rowsPromise);
  const filteredRows: DbDocument[] = rows.filter((row: any) =>
    // TODO: this needs to generically search
    row.name.toLowerCase().includes(props.searchValue.toLowerCase()),
  );
  const displayedRows: DbDocument[] =
    props.searchValue == '' || props.searchValue == null ? rows : filteredRows;
  // console.log('rows', rows);
  // console.log('filteredRows', filteredRows);
  console.log('displayedRows', displayedRows);

  const handleEditRow = (row: any) => {
    props.setEditFormValues(row);
    props.setIsOpenForm(true);
    props.setIsEdit(true);
  };

  return (
    <div style={{ padding: '16px', fontFamily: 'Arial, sans-serif' }}>
      <table>
        <thead>
          <tr>
            <th className="Checkbox Header"></th>
            {props.columnMapping.map((column: ColumnMap<any>) => (
              <th>{column.header}</th>
            ))}
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
          <tbody>
            {displayedRows.map((row: DbDocument) => (
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
                          props.selectedRows.filter((r: any) => {
                            return r._id !== row._id;
                          }),
                        );
                      }
                    }}
                  />
                </td>
                {props.columnMapping.map((column: ColumnMap<any>) => (
                  <td>{column.displayData(row)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Suspense>
      </table>
    </div>
  );
}

export default Table;
