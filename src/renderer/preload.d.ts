import { ElectronHandler } from 'src/main/preload';
import { StoreKeyEnum } from "src/storeConfig";

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler & {
      store: {
        get: (key: StoreKeyEnum) => any;
        set: (key: StoreKeyEnum, val: any) => void;
        // any other methods you've defined...
      };
      autoBrowser: {
        // just a stub, will need to pass a check config object
        check: (url: string) => any;
      };
    };
  }
}

export {};
