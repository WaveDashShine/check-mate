import DiscoveriesTable from 'src/renderer/components/DiscoveriesTable';
import DiscoveriesHeader from 'src/renderer/components/DiscoveriesHeader';
import { use, useState, Suspense } from 'react';
import { DiscoveryDb } from 'src/schema/discovery';
import { deleteDocs, getAllDiscoveries } from 'src/renderer/db';
import Drawer from 'src/renderer/components/generic/Drawer';
import DiscoveriesForm from 'src/renderer/components/DiscoveriesForm';

interface DiscoveriesProps {
  ids: string[];
}

let getAllDiscoveriesCachePromise: Promise<DiscoveryDb[]> = getAllDiscoveries();

export function invalidateDiscoveryCache() {
  getAllDiscoveriesCachePromise = getAllDiscoveries();
}

function Discoveries({ ids }: DiscoveriesProps) {
  const [isOpenDiscoveryForm, setIsOpenDiscoveryForm] =
    useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editFormValues, setEditFormValues] = useState<DiscoveryDb>(
    {} as DiscoveryDb,
  );
  const [selectedRows, setSelectedRows] = useState<DiscoveryDb[]>([]);
  const deleteSelectedRows = async () => {
    await deleteDocs(selectedRows).then(() => {
      setSelectedRows([]);
      invalidateDiscoveryCache();
    });
  };
  const rows: DiscoveryDb[] = use(getAllDiscoveriesCachePromise);
  return (
    <div>
      <DiscoveriesHeader
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
          <DiscoveriesForm
            isOpen={isOpenDiscoveryForm}
            isEdit={isEdit}
            setIsOpen={setIsOpenDiscoveryForm}
            dbFormValues={editFormValues}
          />
        }
      />
      <Suspense fallback={<p>Loading...</p>}>
        <DiscoveriesTable
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

export default Discoveries;
