import Header, { HeaderProps } from 'src/renderer/components/generic/Header';
import { CheckDb } from 'src/schema/check';

interface CheckHeaderProps extends HeaderProps {
  selectedRows: CheckDb[];
  checkFunction: (rows: CheckDb[]) => void; // stub
}

function CheckHeader({
  checkFunction,
  selectedRows,
  setSearchValue,
  setOpenForm,
  setIsEdit,
  isOpenForm,
  isCreateable,
  customButtons,
  deleteSelected,
}: CheckHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <button
        className="text-white font-bold mx-2 bg-blue-500"
        onClick={() => {
          checkFunction(selectedRows);
        }}
        disabled={selectedRows.length < 1}
        type="button"
      >
        Check
      </button>
      <Header
        {...{
          checkFunction,
          selectedRows,
          setSearchValue,
          setOpenForm,
          setIsEdit,
          isOpenForm,
          isCreateable,
          customButtons,
          deleteSelected,
        }}
      />
    </div>
  );
}

export default CheckHeader;
