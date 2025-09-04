import React, { useEffect, useState } from 'react';

interface ScreenshotProps {
  data: Uint8Array | undefined; // PNG bytes
}

function Screenshot(props: ScreenshotProps) {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (props.data) {
      const blob = new Blob([props.data], { type: 'image/png' });
      const objectUrl = URL.createObjectURL(blob);
      setUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl); // cleanup when component unmounts or data changes
      };
    }
  }, [props.data]);

  if (!url) return <p>No image data</p>;

  return <img src={url} alt="screenshot" style={{ maxWidth: '100%' }} />;
}

export default Screenshot;
