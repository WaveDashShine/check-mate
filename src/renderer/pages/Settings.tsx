import 'src/renderer/pages/Settings.css';
import { useEffect, useState } from "react";


function Settings() {
  const [originalPath, setOriginalPath] = useState('');
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    try {
      setOriginalPath(window.electron.store.get('defaultChromePath'));
      setCurrentPath(window.electron.store.get('userChromePath'));
    } catch (error) {
      console.error('Could not retrieve Chrome path:', error);
      setOriginalPath('');
      setCurrentPath('');
    }
  }, []);

  const handleSave = (path: string) => {
    // Simulate saving logic here (e.g. write to config file or localStorage)
    console.log('Saved path:', path);
    window.electron.store.set('userChromePath', path)
    setCurrentPath(path);
  };

  const handleReset = () => {
    const chromePath = window.electron.store.get('defaultChromePath')
    window.electron.store.set('userChromePath', chromePath)
    setCurrentPath(chromePath);
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
        onChange={(e) => handleSave(e.target.value)}
        style={{ width: '100%', padding: '8px', fontSize: '14px', marginBottom: '12px' }}
      />
      <div>
        <button onClick={handleReset} style={{ padding: '8px 16px' }}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Settings;
