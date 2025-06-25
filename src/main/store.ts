// @ts-ignore TODO: IDE inline complains ESM but this is working: TS1479
import Store from 'electron-store';
import chromePaths from 'chrome-paths';
import { ipcMain } from 'electron';

// instantiate store schema and store
type StoreType = {
  testBool?: boolean,
  defaultChromePath: string,
  userChromePath?: string,
};

const store = new Store<StoreType>({
  defaults: {
    defaultChromePath: chromePaths.chrome,
  }
});

// IPC listener for electron-store
ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});

export default store;
