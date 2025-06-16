import 'src/renderer/pages/Settings.css';
import { useEffect, useState } from "react";


function Settings() {
  // TODO: this should use electron-store and handle saving a different chromePath
  // TODO: this is just a draft / stub
  const [originalPath, setOriginalPath] = useState('');
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    try {
      const path = window.electron.store.get('defaultChromePath');
      setOriginalPath(path);
      setCurrentPath(path);
    } catch (error) {
      console.error('Could not retrieve Chrome path:', error);
      setOriginalPath('');
      setCurrentPath('');
    }
  }, []);

  const handleSave = () => {
    // Simulate saving logic here (e.g. write to config file or localStorage)
    console.log('Saved path:', currentPath);
    alert('Path saved! -- this a stub');
  };

  const handleReset = () => {
    const chromePath = window.electron.store.get('defaultChromePath')
    setCurrentPath(chromePath);
    console.log(chromePath);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <label htmlFor="chrome-path" style={{ display: 'block', marginBottom: '8px' }}>
        Chrome Path:
      </label>
      <input
        id="chrome-path"
        type="text"
        value={currentPath}
        readOnly
        style={{ width: '100%', padding: '8px', fontSize: '14px', marginBottom: '12px' }}
      />
      <div>
        <button onClick={handleSave} style={{ marginRight: '10px', padding: '8px 16px' }}>
          Save
        </button>
        <button onClick={handleReset} style={{ padding: '8px 16px' }}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Settings;
