import { ElectronHandler } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler & {
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        // any other methods you've defined...
      };
      puppet: {
        // just a stub, will need to pass a Puppet Object
        get: (url: string) => any;
      }
    };
  }
}

export {};
