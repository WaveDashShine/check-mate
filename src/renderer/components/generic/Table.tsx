import { ReactNode } from 'react';
import { DbDocument } from 'src/schema/dbSchema';
import 'src/renderer/components/generic/Table.css';

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
  rows: DbDocument[];
}

export interface TableProps extends GenericTableProps {
  columnMapping: ColumnMap<any>[];
}

function searchRows(rows: any, searchValue: string): DbDocument[] {
  if (searchValue === '' || searchValue == null) {
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
function Table({
  columnMapping,
  searchValue,
  selectedRows,
  setEditFormValues,
  setIsEdit,
  setIsOpenForm,
  setSelectedRows,
  rows,
}: TableProps) {
  const displayedRows: DbDocument[] = searchRows(rows, searchValue);
  // console.log('displayedRows', displayedRows);

  const handleEditRow = (row: any) => {
    setEditFormValues(row);
    setIsOpenForm(true);
    setIsEdit(true);
  };

  const toggleAll = () => {
    if (selectedRows.length < displayedRows.length) {
      setSelectedRows(displayedRows);
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div style={{ padding: '16px', fontFamily: 'Arial, sans-serif' }}>
      <table className="border-collapse text-black">
        <thead>
          <tr>
            <th className="checkbox-column">
              <input
                type="checkbox"
                checked={selectedRows.length === rows.length}
                onChange={toggleAll}
              />
            </th>
            <th className="id-column">#</th>
            {columnMapping.map((column: ColumnMap<any>) => (
              <th key={column.header}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedRows.map((row: DbDocument, index) => (
            <tr key={row._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={(e) => {
                    const isChecked: boolean = e.target.checked;
                    if (isChecked) {
                      setSelectedRows([...selectedRows, row]);
                    } else {
                      setSelectedRows(
                        selectedRows.filter((r: any) => {
                          return r._id !== row._id;
                        }),
                      );
                    }
                  }}
                />
              </td>
              <td>{index}</td>
              {columnMapping.map((column: ColumnMap<any>) => (
                <td
                  key={column.header + index.toString()}
                  onDoubleClick={() => {
                    handleEditRow(row);
                  }}
                >
                  {column.displayData(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
