interface ScreenshotProps {
  data: Uint8Array | undefined; // PNG bytes
}

function Screenshot(props: ScreenshotProps) {
  if (!props.data) return <p>No image data</p>;

  return (
    <img
      src={`data:image/png;base64,${props.data}`}
      alt="screenshot"
      style={{ maxWidth: '100%' }}
    />
  );
}

export default Screenshot;
