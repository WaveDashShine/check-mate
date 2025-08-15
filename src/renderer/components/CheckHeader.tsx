import 'src/renderer/components/CheckHeader.css';

import { CheckDb } from 'src/schema/check';

interface CheckHeaderProps {
  // setters
  setSearchValue: (searchValue: string) => void;
  setOpenCheckForm: (open: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;

  isDisabled: boolean;
  selectedRows: CheckDb[];

  checkFunction: (rows: CheckDb[]) => void; // stub
}

function CheckHeader(props: CheckHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '12px',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => {
            props.setOpenCheckForm(true);
            props.setIsEdit(false);
          }}
          disabled={props.isDisabled}
        >
          New
        </button>
        <button disabled={props.isDisabled}>Enable/Disable</button>
        <button disabled={props.isDisabled}>Copy</button>
        <button disabled={props.isDisabled}>Delete</button>
        <button
          onClick={() => {
            props.checkFunction(props.selectedRows);
          }}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            fontWeight: 'bold',
          }}
          disabled={props.isDisabled}
        >
          Check
        </button>
      </div>
      <input
        type="text"
        placeholder="Search by name..."
        onChange={(e) => props.setSearchValue(e.target.value)}
      />
    </div>
  );
}

export default CheckHeader;
