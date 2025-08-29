import DiscoveriesTable from 'src/renderer/components/DiscoveriesTable';
import DiscoveriesHeader from 'src/renderer/components/DiscoveriesHeader';
import { useState } from 'react';
import { DiscoveryDb } from 'src/schema/discovery';
import { getAllDiscoveriesCachePromise } from 'src/renderer/db';

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
      ></DiscoveriesHeader>
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
