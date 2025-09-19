import Table, {
  GenericTableProps,
  ColumnMap,
} from 'src/renderer/components/generic/Table';
import { CheckDb, CheckUiAttr } from 'src/schema/check';

interface CheckTableProps extends GenericTableProps {}

function CheckTable({
  rows,
  searchValue,
  selectedRows,
  setEditFormValues,
  setIsEdit,
  setIsOpenForm,
  setSelectedRows,
}: CheckTableProps) {
  const columnMapping: ColumnMap<CheckDb>[] = [
    {
      key: CheckUiAttr.isEnabled,
      header: 'Enabled',
      displayData: (row: CheckDb) => {
        return row.isEnabled ? '✅' : '❌';
      },
    },
    {
      key: CheckUiAttr.name,
      header: 'Name',
      displayData: (row: CheckDb) => {
        return row.name;
      },
    },
    {
      key: CheckUiAttr.note,
      header: 'Note',
      displayData: (row: CheckDb) => {
        return row.note;
      },
    },
    {
      key: CheckUiAttr.ranks,
      header: 'Rank',
      displayData: (row: CheckDb) => {
        return `TODO ${row.name}`;
      },
    },
  ];
  return (
    <div>
      <Table
        rows={rows}
        searchValue={searchValue}
        selectedRows={selectedRows}
        setEditFormValues={setEditFormValues}
        setIsEdit={setIsEdit}
        setIsOpenForm={setIsOpenForm}
        setSelectedRows={setSelectedRows}
        columnMapping={columnMapping}
      />
    </div>
  );
}

export default CheckTable;
