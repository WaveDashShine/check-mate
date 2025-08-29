import { Suspense, use, ReactNode } from 'react';
import { DbDocument } from 'src/schema/dbSchema';

export type ColumnMap<T> = {
  key: keyof T;
  header: string;
  displayData: (row: T) => ReactNode;
};

export interface GenericTableProps {
  idsFilter: string[];
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

function filterRows(rows: any, idsFilter: string[]) {
  console.log('idsFilter', idsFilter);
  if (!idsFilter || idsFilter.length === 0) {
    return rows;
  }
  return rows.filter((row: any) => {
    return idsFilter.includes(row._id);
  });
}

function searchRows(rows: any, searchValue: string): DbDocument[] {
  if (searchValue == '' || searchValue == null) {
    return rows;
  }

  return rows.filter((row: any) => {
    return Object.values(row).some((value) => {
      if (!value) return false;
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchValue.toLowerCase());
      }
      if (Array.isArray(value)) {
        return value.some(
          (item) =>
            typeof item === 'string' &&
            item.toLowerCase().includes(searchValue.toLowerCase()),
        );
      }
      return false;
    });
  });
}

// https://react.dev/reference/rsc/server-components#async-components-with-server-components
function Table(props: TableProps) {
  const rows: DbDocument[] = use(props.rowsPromise);
  const filteredRows: DbDocument[] = filterRows(rows, props.idsFilter);
  const displayedRows: DbDocument[] = searchRows(
    filteredRows,
    props.searchValue,
  );
  // console.log('rows', rows);
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
            <th className="checkbox-column"></th>
            <th className="id-column">#</th>
            {props.columnMapping.map((column: ColumnMap<any>) => (
              <th key={column.header}>{column.header}</th>
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
            {displayedRows.map((row: DbDocument, index) => (
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
                <td>{index}</td>
                {props.columnMapping.map((column: ColumnMap<any>) => (
                  <td key={column.header + index.toString()}>
                    {column.displayData(row)}
                  </td>
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
