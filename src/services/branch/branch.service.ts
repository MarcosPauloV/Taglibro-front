import AxiosService from "../axios.service";
import { Branch } from "./dto/branch.dto";

export class BranchService extends AxiosService {
  constructor() {
    super("http://localhost:8080/branch");
  }

  async createBranch(branch: Branch): Promise<Branch> {
    return await this.rest.post("/", branch, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async getBranches(): Promise<Branch[]> {
    return await this.rest.get("/getBranches", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async getBranchById(id: string): Promise<Branch> {
    return await this.rest.get(`/getBranchById/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async updateBranch(branch: Branch): Promise<Branch> {
    return await this.rest.put("/updateBranch", branch, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async deleteBranch(id: string): Promise<Branch> {
    return await this.rest.delete(`/deleteBranch/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
}
