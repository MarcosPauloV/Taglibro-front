import LocalStorage from "./local-storage";

export const useStorage = () => {
  const getItem = (key: string) => {
    const value = LocalStorage.get(key);
    if (value === null) {
      console.warn(`No value found for key "${key}"`);
    }
    return value;
  };

  const setItem = (key: string, value: any) => {
    LocalStorage.set(key, value);
  };

  const removeItem = (key: string) => {
    LocalStorage.remove(key);
  };

  const clear = () => {
    LocalStorage.clear();
  };

  return { getItem, setItem, removeItem, clear };
};
