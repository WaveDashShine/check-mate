// @ts-ignore TODO: IDE inline complains ESM but this is working: TS1479
import Store from 'electron-store';
import StoreKeys, { StoreType } from 'src/storeConfig';
import chromePaths from 'chrome-paths';

// instantiate store schema and store
const store = new Store<StoreType>();

function setDefaults() {
  store.set(StoreKeys.defaultChromePath, chromePaths.chrome);
}

setDefaults();
export default store;
