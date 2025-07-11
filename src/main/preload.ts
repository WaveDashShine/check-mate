// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { StoreKeyEnum, StoreType } from 'src/storeConfig';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  store: {
    get(key: StoreKeyEnum) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property: StoreKeyEnum, val: string) {
      ipcRenderer.send('electron-store-set', property, val);
    },
  },
  autoBrowser: {
    check(url: string) {
      // stub - need to send CheckConfig object
      return ipcRenderer.sendSync('browser-check', url);
    }, // stub: need to return CheckResult object
    launch() {
      ipcRenderer.send('browser-launch');
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
