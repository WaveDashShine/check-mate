import DiscoveryTable from 'src/renderer/components/DiscoveryTable';
import DiscoveryHeader from 'src/renderer/components/DiscoveryHeader';
import { useState } from 'react';
import { DiscoveryDb } from 'src/schema/discovery';
import { getAllDiscoveriesCachePromise } from 'src/renderer/db';

function Discovery() {
  const [isOpenDiscoveryForm, setIsOpenDiscoveryForm] =
    useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editFormValues, setEditFormValues] = useState<DiscoveryDb>(
    {} as DiscoveryDb,
  );
  const [selectedRows, setSelectedRows] = useState<DiscoveryDb[]>([]);

  return (
    <div>
      <DiscoveryHeader
        selectedRows={selectedRows}
        setSearchValue={setSearchValue}
        setOpenForm={setIsOpenDiscoveryForm}
        setIsEdit={setIsEdit}
        isOpenForm={isOpenDiscoveryForm}
        customButtons={[]}
        isCreateable={false}
      ></DiscoveryHeader>
      <DiscoveryTable
        searchValue={searchValue}
        setIsOpenForm={setIsOpenDiscoveryForm}
        setIsEdit={setIsEdit}
        setEditFormValues={setEditFormValues}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        rowsPromise={getAllDiscoveriesCachePromise}
      ></DiscoveryTable>
    </div>
  );
}

export default Discovery;
