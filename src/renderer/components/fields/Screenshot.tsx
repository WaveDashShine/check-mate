interface ScreenshotProps {
  data: Uint8Array | undefined; // PNG bytes
}

function Screenshot({ data }: ScreenshotProps) {
  if (!data) return <p>No image data</p>;

  return (
    <img
      src={`data:image/png;base64,${data}`}
      alt="screenshot"
      style={{ maxWidth: '100%' }}
    />
  );
}

export default Screenshot;
