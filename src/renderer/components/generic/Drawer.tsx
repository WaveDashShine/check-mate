import { ReactNode } from 'react';

import 'src/renderer/components/generic/Drawer.css';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Drawer(props: DrawerProps) {
  return (
    <>
      {/* Backdrop */}
      {props.isOpen && (
        <div className="drawer-backdrop" onClick={props.onClose} />
      )}

      {/* Drawer panel */}
      <div className={`drawer ${props.isOpen ? 'open' : ''}`}>
        <button className="drawer-close" onClick={props.onClose}>
          ×
        </button>
        <div className="drawer-content">{props.children}</div>
      </div>
    </>
  );
}

export default Drawer;
