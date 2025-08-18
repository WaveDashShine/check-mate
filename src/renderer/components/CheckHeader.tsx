import 'src/renderer/components/CheckHeader.css';
import Header, { HeaderProps } from 'src/renderer/components/generic/Header';
import { CheckDb } from 'src/schema/check';

interface CheckHeaderProps extends HeaderProps {
  selectedRows: CheckDb[];
  checkFunction: (rows: CheckDb[]) => void; // stub
}

// TODO: move a bunch of these buttons to the generic Header
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
      <button
        onClick={() => {
          props.checkFunction(props.selectedRows);
        }}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          fontWeight: 'bold',
          marginRight: '8px',
        }}
        disabled={props.isOpenForm}
      >
        Check
      </button>
      <Header {...props} />
    </div>
  );
}

export default CheckHeader;
