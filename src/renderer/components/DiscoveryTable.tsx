import Table, {
  GenericTableProps,
  ColumnMap,
} from 'src/renderer/components/generic/Table';
import { DiscoveryDb, DiscoveryUiAttr } from 'src/schema/discovery';

interface DiscoveryTableProps extends GenericTableProps {}

function DiscoveryTable(props: DiscoveryTableProps) {
  const columnMapping: ColumnMap<DiscoveryDb>[] = [
    {
      key: DiscoveryUiAttr.timestamp,
      header: 'Timestamp',
      displayData: (row: DiscoveryDb) => {
        return row.timestamp.toDateString();
      },
    },
    {
      key: DiscoveryUiAttr.text,
      header: 'Text',
      displayData: (row: DiscoveryDb) => {
        return row.text ? '✅' : '❌';
      },
    },
    {
      key: DiscoveryUiAttr.html,
      header: 'HTML',
      displayData: (row: DiscoveryDb) => {
        return row.html ? '✅' : '❌';
      },
    },
    {
      key: DiscoveryUiAttr.screenshot,
      header: 'Screenshot',
      displayData: (row: DiscoveryDb) => {
        return row.screenshot ? '✅' : '❌';
      },
    },
  ];
  return (
    <div>
      <Table {...props} columnMapping={columnMapping}></Table>
    </div>
  );
}

export default DiscoveryTable;
