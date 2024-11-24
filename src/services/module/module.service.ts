import AxiosService from "../axios.service";
import { CreateModuleDto } from "./dto/module.create.dto";
import { ModuleDto } from "./dto/module.dto";
import { UpdateModuleDto } from "./dto/module.update.dto";

export class ModuleService extends AxiosService {
  constructor() {
    super("http://localhost:8080/module");
  }

  async getAll(token: string): Promise<ModuleDto[]> {
    const mod = await this.rest.get("/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Módulos encontrados:", mod.data);

    return mod.data;
  }

  async getById(moduleId: string, token: string): Promise<ModuleDto> {
    return await this.rest.get(`/${moduleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async create(module: CreateModuleDto, token: string): Promise<ModuleDto> {
    const mod = await this.rest.post("/", module, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return mod.data;
  }

  async update(module: UpdateModuleDto, token: string): Promise<ModuleDto> {
    return await this.rest.put("/", module, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async delete(moduleId: string, token: string): Promise<void> {
    return await this.rest.delete(`/${moduleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
