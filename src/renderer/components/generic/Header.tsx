export interface HeaderProps {
  setSearchValue: (searchValue: string) => void;
  setOpenForm: (open: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;

  isOpenForm: boolean;
  selectedRows: any[];
  isCreateable: boolean;
  customButtons: Button[];
}

export interface Button {
  text: string;
  onClick: any; // generic function for button to perform
  disabledCond: boolean;
}

export function newButton(
  text: string,
  onClick: any,
  disabledCond: boolean,
): Button {
  return {
    text: text,
    onClick: onClick,
    disabledCond: disabledCond,
  };
}

function generateButtons(buttons: Button[]) {
  return (
    <div>
      {buttons.map((button) => (
        <button onClick={button.onClick()} disabled={button.disabledCond}>
          {button.text}
        </button>
      ))}
    </div>
  );
}
// e.g. enable disable doesn't belong in the generic section

function Header(props: HeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {props.isCreateable ? (
        <button
          onClick={() => {
            props.setOpenForm(true);
            props.setIsEdit(false);
          }}
          disabled={props.isOpenForm}
        >
          New
        </button>
      ) : null}
      {generateButtons(props.customButtons)}
      {props.isCreateable ? (
        <button disabled={props.isOpenForm}>Copy</button>
      ) : null}
      <button disabled={props.isOpenForm || props.selectedRows.length === 0}>
        Delete
      </button>
      <input
        type="text"
        placeholder="Search by name..."
        onChange={(e) => props.setSearchValue(e.target.value)}
      />
    </div>
  );
}

export default Header;
