import DiscoveriesTable from 'src/renderer/components/DiscoveriesTable';
import DiscoveriesHeader from 'src/renderer/components/DiscoveriesHeader';
import { useState } from 'react';
import { DiscoveryDb } from 'src/schema/discovery';
import {
  getAllDiscoveriesCachePromise,
  invalidateDiscoveryCache,
  deleteDocs,
} from 'src/renderer/db';
import Drawer from 'src/renderer/components/generic/Drawer';
import DiscoveriesForm from 'src/renderer/components/DiscoveriesForm';

interface DiscoveriesProps {
  ids: string[];
}

function Discoveries(props: DiscoveriesProps) {
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
        delete={deleteSelectedRows}
      ></DiscoveriesHeader>
      <Drawer
        isOpen={isOpenDiscoveryForm}
        onClose={() => {
          setIsOpenDiscoveryForm(false);
        }}
        children={
          <DiscoveriesForm
            isOpen={isOpenDiscoveryForm}
            isEdit={isEdit}
            setIsOpen={setIsOpenDiscoveryForm}
            dbFormValues={editFormValues}
          />
        }
      ></Drawer>
      <DiscoveriesTable
        searchValue={searchValue}
        setIsOpenForm={setIsOpenDiscoveryForm}
        setIsEdit={setIsEdit}
        setEditFormValues={setEditFormValues}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        rowsPromise={getAllDiscoveriesCachePromise}
        idsFilter={props.ids}
      ></DiscoveriesTable>
    </div>
  );
}

export default Discoveries;
