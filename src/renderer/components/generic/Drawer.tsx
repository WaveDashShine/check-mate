import 'src/renderer/components/generic/Drawer.css';
import { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Drawer(props: DrawerProps) {
  const minWidth = 250;
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(minWidth);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        e.preventDefault();
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth >= minWidth && newWidth <= window.innerWidth) {
          setWidth(newWidth);
        }
      }
    },
    [minWidth, isResizing, setWidth],
  );
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', resize);
      return () => {
        document.removeEventListener('mousemove', resize);
      };
    }
  }, [isResizing, resize]);

  return (
    <div
      onMouseUp={() => {
        setIsResizing(false);
      }}
    >
      {/* Backdrop */}
      {props.isOpen && (
        <div className="drawer-backdrop" onDoubleClick={props.onClose} />
      )}

      {/* Drawer panel */}
      <div
        className={`drawer ${props.isOpen ? 'open' : ''}`}
        style={props.isOpen ? { width } : {}}
      >
        <span
          className={'drawer-resizer'}
          onMouseOver={() => {
            document.body.style.cursor = 'col-resize';
          }}
          onMouseLeave={() => {
            document.body.style.cursor = 'default';
          }}
          onMouseDown={(e) => {
            setIsResizing(true);
            e.preventDefault();
          }}
        ></span>
        <button className="drawer-close" onClick={props.onClose}>
          ×
        </button>
        <div className="drawer-content">{props.children}</div>
      </div>
    </div>
  );
}

export default Drawer;
