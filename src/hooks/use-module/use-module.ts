import { create } from "zustand";
import { ModuleState } from "./dto/module-state.dto";

const useModuleStore = create<ModuleState>(set => ({
  modules: [],
  setModulesS: modules => set({ modules }),
  addModule: module => set(state => ({ modules: [...state.modules, module] })),
  updateModule: updatedModule =>
    set(state => ({
      modules: state.modules.map(module => (module.id === updatedModule.id ? updatedModule : module)),
    })),
  removeModule: moduleId =>
    set(state => ({
      modules: state.modules.filter(module => module.id !== moduleId),
    })),
}));

export default useModuleStore;
