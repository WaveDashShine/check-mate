import Table, {
  GenericTableProps,
  ColumnMap,
} from 'src/renderer/components/generic/Table';
import { RankDb, RankUiAttr } from 'src/schema/rank';

interface RankTableProps extends GenericTableProps {}

function RankTable({
  rows,
  searchValue,
  selectedRows,
  setEditFormValues,
  setIsEdit,
  setIsOpenForm,
  setSelectedRows,
}: RankTableProps) {
  const columnMapping: ColumnMap<RankDb>[] = [
    {
      key: RankUiAttr.piece,
      header: 'Piece',
      displayData: (row: RankDb) => {
        // TODO: handle icons
        return row.piece ? 'TODO' : 'TODO';
      },
    },
    {
      key: RankUiAttr.name,
      header: 'Name',
      displayData: (row: RankDb) => {
        return row.name;
      },
    },
    {
      key: RankUiAttr.note,
      header: 'Note',
      displayData: (row: RankDb) => {
        return row.note;
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

export default RankTable;
