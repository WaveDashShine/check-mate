// contains the typing for store
// tracking keys for Store to make refactoring easier later
const StoreKeys = {
  defaultChromePath: 'defaultChromePath',
  userChromePath: 'userChromePath',
} as const;
export default StoreKeys;
export type StoreKeyEnum = keyof typeof StoreKeys;


export type StoreType = {
  defaultChromePath: string;
  userChromePath?: string;
};
