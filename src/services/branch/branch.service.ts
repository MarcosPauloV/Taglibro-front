import AxiosService from "../axios.service";
import { BranchDto } from "./dto/branch.dto";

export class BranchService extends AxiosService {
  constructor() {
    super("http://localhost:8080/branch");
  }

  async create(branch: BranchDto): Promise<BranchDto> {
    return await this.rest.post("/", branch, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async getAll(): Promise<BranchDto[]> {
    return await this.rest.get("/getBranches", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async getById(id: string): Promise<BranchDto> {
    return await this.rest.get(`/getBranchById/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async update(branch: BranchDto): Promise<BranchDto> {
    return await this.rest.put("/updateBranch", branch, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async delete(id: string): Promise<BranchDto> {
    return await this.rest.delete(`/deleteBranch/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
}
