import Header, { HeaderProps } from 'src/renderer/components/generic/Header';
import { DiscoveryDb } from 'src/schema/discovery';

interface DiscoveryHeaderProps extends HeaderProps {
  selectedRows: DiscoveryDb[];
}

function DiscoveryHistoryHeader({
  selectedRows,
  setSearchValue,
  setOpenForm,
  setIsEdit,
  isOpenForm,
  isCreatable,
  customButtons,
  deleteSelected,
}: DiscoveryHeaderProps) {
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

export default DiscoveryHistoryHeader;
