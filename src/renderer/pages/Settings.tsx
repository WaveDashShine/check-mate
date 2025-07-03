import 'src/renderer/pages/Settings.css';
import { useEffect, useState } from 'react';
import StoreKeys, { StoreKeyEnum } from 'src/storeConfig';

function Settings() {
  const [originalPath, setOriginalPath] = useState('');
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    try {
      setOriginalPath(window.electron.store.get(StoreKeys.defaultChromePath));
      setCurrentPath(window.electron.store.get(StoreKeys.userChromePath));
    } catch (error) {
      console.error('Could not retrieve Chrome path:', error);
      setOriginalPath('');
      setCurrentPath('');
    }
  }, []);

  const handleSave = (
    storeKey: StoreKeyEnum,
    saveValue: string,
    effectCall: any,
  ) => {
    // Simulate saving logic here (e.g. write to config file or localStorage)
    console.log('Saved Key', storeKey, 'Saved value:', saveValue);
    window.electron.store.set(storeKey, saveValue);
    effectCall(saveValue);
  };

  const handleResetChromePath = () => {
    const chromePath = window.electron.store.get(StoreKeys.defaultChromePath);
    window.electron.store.set(StoreKeys.userChromePath, chromePath);
    setCurrentPath(chromePath);
  };

  const launchChromeBrowser = () => {
    window.electron.autoBrowser.launch();
  };

  return (
    <div>
      <div className="field">
        <label htmlFor="chrome-path">Chrome Path:</label>
        <input
          id="chrome-path"
          type="text"
          value={currentPath || originalPath}
          onChange={(e) =>
            handleSave(StoreKeys.userChromePath, e.target.value, setCurrentPath)
          }
        />
        <button onClick={handleResetChromePath}>Reset</button>
      </div>
      <div className="field">
        <label htmlFor="user-data-chrome-path">Modify Chrome Browser:</label>
        <button onClick={launchChromeBrowser}>Launch</button>
      </div>
    </div>
  );
}

export default Settings;
