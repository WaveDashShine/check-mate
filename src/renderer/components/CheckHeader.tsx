import Header, { HeaderProps } from 'src/renderer/components/generic/Header';
import { CheckDb } from 'src/schema/check';

interface CheckHeaderProps extends HeaderProps {
  selectedRows: CheckDb[];
  checkFunction: (rows: CheckDb[]) => void; // stub
}

function CheckHeader(props: CheckHeaderProps) {
  return (
    <div className={'flex items-center justify-between mb-3'}>
      <button
        className={'text-white font-bold mx-2 bg-blue-500'}
        onClick={() => {
          props.checkFunction(props.selectedRows);
        }}
        disabled={props.selectedRows.length < 1}
      >
        Check
      </button>
      <Header {...props} />
    </div>
  );
}

export default CheckHeader;
