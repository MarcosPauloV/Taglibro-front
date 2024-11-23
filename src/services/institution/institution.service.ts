import AxiosService from "../axios.service";
import { InstitutionCreateDTO } from "./dto/institution.create.dto";
import { InstitutionDto } from "./dto/institution.dto";
import { InstitutionUpdateDTO } from "./dto/institution.update.dot";

export class InstitutionService extends AxiosService {
  constructor() {
    super("http://localhost:8080/institution");
  }

  async create(institutionData: InstitutionCreateDTO, token: string): Promise<void> {
    await this.rest.post("/", institutionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getAll(token: string): Promise<InstitutionDto[]> {
    const res = await this.rest.get("/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  async getById(id: string, token: string): Promise<InstitutionDto> {
    const res = await this.rest.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);

    return res.data;
  }

  async update(institutionData: InstitutionUpdateDTO, token: string): Promise<void> {
    await this.rest.put("/", institutionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async delete(id: string, token: string): Promise<void> {
    await this.rest.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
