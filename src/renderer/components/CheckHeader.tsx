import 'src/renderer/components/CheckHeader.css';

interface CheckHeaderProps {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  setOpenCheckForm: (open: boolean) => void;
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
          }}
        >
          New
        </button>
        <button>Enable/Disable</button>
        <button>Copy</button>
        <button>Delete</button>
        <button
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Check
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name..."
        value={props.searchValue}
        onChange={(e) => props.setSearchValue(e.target.value)}
      />
    </div>
  );
}

export default CheckHeader;
