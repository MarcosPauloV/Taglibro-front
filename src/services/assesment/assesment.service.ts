import AxiosService from "../axios.service";
import { CreateAssessmentDto } from "./dto/assesment.create.dto";
import { AssesmentDTO } from "./dto/assesment.dto";

export class AssesmentService extends AxiosService {
  constructor() {
    super("http://localhost:8080/assesment");
  }

  async create(assesment: CreateAssessmentDto, branchId: string, token: string): Promise<AssesmentDTO> {
    return await this.rest.post(
      "/",
      {
        ...assesment,
        branchId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async findByModule(moduleId: string, token: string) {
    const data = await this.rest.get(`/module/${moduleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  }

  async findByUser(userId: string, token: string) {
    return await this.rest.get(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async update(assesment: any, token: string): Promise<any> {
    return await this.rest.put("/", assesment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async delete(assesmentId: string, token: string): Promise<void> {
    return await this.rest.delete(`/${assesmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
