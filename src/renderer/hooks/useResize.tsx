import { useCallback, useEffect, useState } from 'react';

interface UseResizeProps {
  minWidth: number;
}

interface UseResizeReturn {
  width: number;
  enableResize: () => void;
}

function useResize(props: UseResizeProps): UseResizeReturn {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(props.minWidth);

  const enableResize = useCallback(() => {
    setIsResizing(true);
  }, [setIsResizing]);

  const disableResize = useCallback(() => {
    setIsResizing(false);
  }, [setIsResizing]);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        // You may want to add some offset here from props
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth >= props.minWidth && newWidth <= window.innerWidth) {
          setWidth(newWidth);
        }
      }
    },
    [props.minWidth, isResizing, setWidth],
  );

  useEffect(() => {
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', disableResize);

    return () => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', disableResize);
    };
  }, [disableResize, resize]);

  return { width, enableResize };
}

export default useResize;
