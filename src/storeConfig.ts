// contains the typing for store
// tracking keys for Store to make refactoring easier later

// ValueOf similar to KeyOf implementation
type ValueOf<T> = T[keyof T];

const StoreKeys = {
  defaultChromePath: 'settings.defaultChromePath',
  userChromePath: 'settings.userChromePath',
} as const;
export default StoreKeys;
export type StoreKeyEnum = ValueOf<typeof StoreKeys>;

// do we want to store each Check config and Check Result as a dictionary of references?
export type StoreType = {
  type: 'object';
  properties: {
    settings: {
      type: 'object';
      properties: {
        defaultChromePath: string;
        userChromePath?: string;
        userDataChromePath?: string;
      };
    };
  };
};
