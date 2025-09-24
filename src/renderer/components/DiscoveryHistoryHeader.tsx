import Header, { HeaderProps } from 'src/renderer/components/generic/Header';
import { DiscoveryDb } from 'src/schema/discovery';

interface DiscoveryHeaderProps extends HeaderProps {
  selectedRows: DiscoveryDb[];
}

function DiscoveryHistoryHeader(props: DiscoveryHeaderProps) {
  return (
    <div>
      <Header {...props} />
    </div>
  );
}

export default DiscoveryHistoryHeader;
