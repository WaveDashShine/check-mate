import Table, {
  GenericTableProps,
  ColumnMap,
} from 'src/renderer/components/generic/Table';
import { DiscoveryDb, DiscoveryUiAttr } from 'src/schema/discovery';

interface DiscoveryTableProps extends GenericTableProps {}

function DiscoveriesTable(props: DiscoveryTableProps) {
  const columnMapping: ColumnMap<DiscoveryDb>[] = [
    {
      key: DiscoveryUiAttr.timestamp,
      header: 'Timestamp',
      displayData: (row: DiscoveryDb) => {
        const date = new Date(row.timestamp);
        return String().concat(
          date.toLocaleDateString(),
          ' - ',
          date.toLocaleTimeString(),
        );
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

export default DiscoveriesTable;
