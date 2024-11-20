import { Token } from "../auth/dto/token.dto";
import AxiosService from "../axios.service";
import { InstitutionDto } from "./dto/institution.dto";

export class InstitutionService extends AxiosService {
  constructor() {
    super("http://localhost:8080/institution");
  }

  async registerInstitution(institutionData: InstitutionDto, token: string): Promise<void> {
    await this.rest.post("/", institutionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getInstitutions(token: string): Promise<InstitutionDto[]> {
    const res = await this.rest.get("/getInstitutions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  async getInstitutionById(id: string, token: string): Promise<InstitutionDto> {
    const res = await this.rest.get(`/getInstitutionById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  async updateInstitution(institutionData: InstitutionDto, token: string): Promise<void> {
    await this.rest.put("/updateInstitution", institutionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteInstitution(id: string, token: string): Promise<void> {
    await this.rest.delete(`/deleteInstitution/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
