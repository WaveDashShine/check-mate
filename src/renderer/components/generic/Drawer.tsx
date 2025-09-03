import 'src/renderer/components/generic/Drawer.css';
import { ReactNode } from 'react';
import useResize from 'src/renderer/hooks/useResize';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Drawer(props: DrawerProps) {
  const { width, enableResize } = useResize({ minWidth: 250 });
  return (
    <>
      {/* Backdrop */}
      {props.isOpen && (
        <div className="drawer-backdrop" onDoubleClick={props.onClose} />
      )}

      {/* Drawer panel */}
      <div
        className={`drawer ${props.isOpen ? 'open' : ''}`}
        onMouseDown={enableResize}
        style={props.isOpen ? { width } : {}}
      >
        <button className="drawer-close" onClick={props.onClose}>
          ×
        </button>
        <div className="drawer-content">{props.children}</div>
      </div>
    </>
  );
}

export default Drawer;
