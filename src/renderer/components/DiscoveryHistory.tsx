import DiscoveryHistoryTable from 'src/renderer/components/DiscoveryHistoryTable';
import DiscoveryHistoryHeader from 'src/renderer/components/DiscoveryHistoryHeader';
import { use, useState, Suspense } from 'react';
import { DiscoveryDb } from 'src/schema/discovery';
import { deleteDocs, getAllDiscoveryHistory } from 'src/renderer/db';
import Drawer from 'src/renderer/components/generic/Drawer';
import DiscoveryHistoryForm from 'src/renderer/components/DiscoveryHistoryForm';

interface DiscoveryHistoryProps {
  ids: string[];
}

let getAllDiscoveriesCachePromise: Promise<DiscoveryDb[]> =
  getAllDiscoveryHistory();

export function invalidateDiscoveryHistoryCache() {
  getAllDiscoveriesCachePromise = getAllDiscoveryHistory();
}

function DiscoveryHistory({ ids }: DiscoveryHistoryProps) {
  const [isOpenDiscoveryForm, setIsOpenDiscoveryForm] =
    useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editFormValues, setEditFormValues] = useState<DiscoveryDb>(
    {} as DiscoveryDb,
  );
  const [selectedRows, setSelectedRows] = useState<DiscoveryDb[]>([]);
  const deleteSelectedRows = async () => {
    await deleteDocs(selectedRows).then((result) => {
      setSelectedRows([]);
      invalidateDiscoveryHistoryCache();
      return result;
    });
  };
  const rows: DiscoveryDb[] = use(getAllDiscoveriesCachePromise);
  return (
    <div>
      <DiscoveryHistoryHeader
        selectedRows={selectedRows}
        setSearchValue={setSearchValue}
        setOpenForm={setIsOpenDiscoveryForm}
        setIsEdit={setIsEdit}
        isOpenForm={isOpenDiscoveryForm}
        customButtons={[]}
        isCreateable={false}
        deleteSelected={deleteSelectedRows}
      />
      <Drawer
        isOpen={isOpenDiscoveryForm}
        onClose={() => {
          setIsOpenDiscoveryForm(false);
        }}
        content={
          <DiscoveryHistoryForm
            isOpen={isOpenDiscoveryForm}
            isEdit={isEdit}
            setIsOpen={setIsOpenDiscoveryForm}
            dbFormValues={editFormValues}
          />
        }
      />
      <Suspense fallback={<p>Loading...</p>}>
        <DiscoveryHistoryTable
          searchValue={searchValue}
          setIsOpenForm={setIsOpenDiscoveryForm}
          setIsEdit={setIsEdit}
          setEditFormValues={setEditFormValues}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          rows={rows}
          idsFilter={ids}
        />
      </Suspense>
    </div>
  );
}

export default DiscoveryHistory;
