export interface Button {
  text: string;
  onClick: any; // generic function for button to perform
  disabledCond: boolean;
}

export interface HeaderProps {
  setSearchValue: (searchValue: string) => void;
  setOpenForm: (open: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;

  isOpenForm: boolean;
  selectedRows: any[];
  isCreatable: boolean;
  customButtons: Button[];

  deleteSelected: () => Promise<void>;
}

export function newButton(
  text: string,
  onClick: any,
  disabledCond: boolean,
): Button {
  return {
    text,
    onClick,
    disabledCond,
  };
}

export const buttonStyling: string = 'bg-white';

function generateButtons(buttons: Button[]) {
  return (
    <div className="flex items-center justify-between gap-2">
      {buttons.map((button) => (
        <button
          className={buttonStyling}
          onClick={() => {
            button.onClick();
          }}
          disabled={button.disabledCond}
          key={button.text}
          type="button"
        >
          {button.text}
        </button>
      ))}
    </div>
  );
}

// e.g. enable disable doesn't belong in the generic section

function Header({
  customButtons,
  deleteSelected,
  isCreatable,
  isOpenForm,
  selectedRows,
  setIsEdit,
  setOpenForm,
  setSearchValue,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      {isCreatable ? (
        <button
          className={buttonStyling}
          onClick={() => {
            setIsEdit(false);
            setOpenForm(true);
          }}
          disabled={isOpenForm}
          type="button"
        >
          New
        </button>
      ) : null}
      {generateButtons(customButtons)}
      <button
        className={buttonStyling}
        disabled={isOpenForm || selectedRows.length === 0}
        onClick={async () => {
          await deleteSelected();
        }}
        type="button"
      >
        Delete
      </button>
      <input
        className="min-w-[150px] rounded-xl"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}

export default Header;
