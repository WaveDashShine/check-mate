import Header, { HeaderProps } from 'src/renderer/components/generic/Header';
import { RankDb } from 'src/schema/rank';

interface RankHeaderProps extends HeaderProps {
  selectedRows: RankDb[];
}

function RankHeader({
  selectedRows,
  setSearchValue,
  setOpenForm,
  setIsEdit,
  isOpenForm,
  isCreatable,
  customButtons,
  deleteSelected,
}: RankHeaderProps) {
  return (
    <div>
      <Header
        selectedRows={selectedRows}
        setSearchValue={setSearchValue}
        setOpenForm={setOpenForm}
        setIsEdit={setIsEdit}
        isOpenForm={isOpenForm}
        isCreatable={isCreatable}
        customButtons={customButtons}
        deleteSelected={deleteSelected}
      />
    </div>
  );
}

export default RankHeader;
