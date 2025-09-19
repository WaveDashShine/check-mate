import Table, { TableProps } from 'src/renderer/components/generic/Table';
import { DbDocument } from '../../../schema/dbSchema';

export interface IdFilterTableProps extends TableProps {
  idsFilter: string[];
}

function filterRows(rows: any, idsFilter: string[]) {
  console.log('idsFilter', idsFilter);
  if (!idsFilter || idsFilter.length === 0) {
    return [];
  }
  return rows.filter((row: any) => {
    return idsFilter.includes(row._id);
  });
}

function IdFilterTable({
  columnMapping,
  idsFilter,
  rows,
  searchValue,
  selectedRows,
  setEditFormValues,
  setIsEdit,
  setIsOpenForm,
  setSelectedRows,
}: IdFilterTableProps) {
  const filteredRows: DbDocument[] = filterRows(rows, idsFilter);
  return (
    <Table
      columnMapping={columnMapping}
      rows={filteredRows}
      searchValue={searchValue}
      selectedRows={selectedRows}
      setEditFormValues={setEditFormValues}
      setIsEdit={setIsEdit}
      setIsOpenForm={setIsOpenForm}
      setSelectedRows={setSelectedRows}
    />
  );
}

export default IdFilterTable;
