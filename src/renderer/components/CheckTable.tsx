import Table, {
  GenericTableProps,
  ColumnMap,
} from 'src/renderer/components/generic/Table';
import { CheckDb, CheckUiAttr } from 'src/schema/check';

interface CheckTableProps extends GenericTableProps {}

function CheckTable(props: CheckTableProps) {
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
        return 'TODO';
      },
    },
  ];
  return (
    <div>
      <Table {...props} columnMapping={columnMapping}></Table>
    </div>
  );
}

export default CheckTable;
