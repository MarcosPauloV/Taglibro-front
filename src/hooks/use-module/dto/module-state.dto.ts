import { ModuleDto } from "../../../services/module/dto/module.dto";

export interface ModuleState {
  modules: ModuleDto[];
  setModulesS: (modules: ModuleDto[]) => void;
  addModule: (module: ModuleDto) => void;
  updateModule: (updatedModule: ModuleDto) => void;
  removeModule: (moduleId: string) => void;
}
