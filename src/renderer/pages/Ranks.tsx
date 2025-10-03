import RankForm from 'src/renderer/components/RankForm';
import RankHeader from 'src/renderer/components/RankHeader';
import Drawer from 'src/renderer/components/generic/Drawer';
import RankTable from 'src/renderer/components/RankTable';
import { Suspense, use, useState } from 'react';
import { deleteDocs, getAllRanks } from 'src/renderer/db';
import { RankDb } from 'src/schema/rank';

let getRanksPromise: Promise<any[]> = getAllRanks();

export function invalidateRanks() {
  getRanksPromise = getAllRanks(); // clears the cache so next call refetches
}

function Ranks() {
  const [isOpenRankForm, setIsOpenRankForm] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editFormValues, setEditFormValues] = useState<RankDb>({} as RankDb);
  const [selectedRows, setSelectedRows] = useState<RankDb[]>([]);
  const rows: RankDb[] = use(getRanksPromise);

  const deleteSelectedRows = async () => {
    await deleteDocs(selectedRows).then((result) => {
      setSelectedRows([]);
      invalidateRanks();
      return result;
    });
  };
  return (
    <div>
      <span className="m-2" />
      <RankHeader
        customButtons={[]}
        setSearchValue={setSearchValue}
        setOpenForm={setIsOpenRankForm}
        setIsEdit={setIsEdit}
        isOpenForm={isOpenRankForm}
        selectedRows={selectedRows}
        isCreatable
        deleteSelected={() => deleteSelectedRows()}
      />
      <Drawer
        isOpen={isOpenRankForm}
        onClose={() => setIsOpenRankForm(false)}
        content={
          <RankForm
            isOpen={isOpenRankForm}
            setIsOpen={setIsOpenRankForm}
            dbFormValues={editFormValues}
            isEdit={isEdit}
            invalidateCache={invalidateRanks}
          />
        }
      />
      <Suspense fallback={<p>Loading...</p>}>
        <RankTable
          searchValue={searchValue}
          setEditFormValues={setEditFormValues}
          setIsOpenForm={setIsOpenRankForm}
          setIsEdit={setIsEdit}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          rows={rows}
        />
      </Suspense>
    </div>
  );
}

export default Ranks;
