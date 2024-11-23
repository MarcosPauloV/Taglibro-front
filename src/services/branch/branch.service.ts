import AxiosService from "../axios.service";
import { BranchDto } from "./dto/branch.dto";
import { CreateBranchDto } from "./dto/create.branch.dto";

export class BranchService extends AxiosService {
  constructor() {
    super("http://localhost:8080/branch");
  }

  async create(branch: CreateBranchDto, token: string): Promise<CreateBranchDto> {
    console.log(branch.address);

    const rer = await this.rest.post("/", branch, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(rer);

    return rer.data;
  }

  async getAll(token: string): Promise<BranchDto[]> {
    const branchs = await this.rest.get("/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(branchs.data);
    return branchs.data;
  }

  async getById(id: string, token: string): Promise<BranchDto> {
    return await this.rest.get(`/getBranchById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async update(branch: BranchDto, token: string): Promise<BranchDto> {
    return await this.rest.put("/updateBranch", branch, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async delete(id: string, token: string): Promise<BranchDto> {
    return await this.rest.delete(`/deleteBranch/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
