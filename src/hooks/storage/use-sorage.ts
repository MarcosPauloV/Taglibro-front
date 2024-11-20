import { create } from "zustand";
import { Storage } from "./dto/storage.dto";
import LocalStorage from "./local-storage";

export const useStorage = create<Storage>((set, get) => ({
  keys: Object.keys(localStorage),

  setItem: (key, value) => {
    LocalStorage.set(key, value);
    if (!get().keys.includes(key)) {
      set({ keys: [...get().keys, key] });
    }
  },

  getItem: key => LocalStorage.get(key),

  removeItem: key => {
    LocalStorage.remove(key);
    set({ keys: get().keys.filter(k => k !== key) });
  },

  clear: () => {
    LocalStorage.clear();
    set({ keys: [] });
  },
}));
