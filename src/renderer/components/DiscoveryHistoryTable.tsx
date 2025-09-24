import {
  ColumnMap,
  GenericTableProps,
} from 'src/renderer/components/generic/Table';
import { DiscoveryDb, DiscoveryUiAttr } from 'src/schema/discovery';
import IdFilterTable from './generic/IdFilterTable';

interface DiscoveryTableProps extends GenericTableProps {
  idsFilter: string[];
  rows: DiscoveryDb[];
}

function dateComparison(a: DiscoveryDb, b: DiscoveryDb): number {
  // A negative value indicates that a should come before b.
  // A positive value indicates that a should come after b.
  // latest timestamp displays first
  return a.timestamp > b.timestamp ? -1 : 1;
}

function DiscoveryHistoryTable({
  idsFilter,
  rows,
  searchValue,
  selectedRows,
  setEditFormValues,
  setIsEdit,
  setIsOpenForm,
  setSelectedRows,
}: DiscoveryTableProps) {
  rows.sort(dateComparison);
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
      <IdFilterTable
        idsFilter={idsFilter}
        columnMapping={columnMapping}
        rows={rows}
        searchValue={searchValue}
        selectedRows={selectedRows}
        setEditFormValues={setEditFormValues}
        setIsEdit={setIsEdit}
        setIsOpenForm={setIsOpenForm}
        setSelectedRows={setSelectedRows}
      />
    </div>
  );
}

export default DiscoveryHistoryTable;
