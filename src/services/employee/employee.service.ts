import AxiosService from "../axios.service";
import { EmployeeDto } from "./dto/employee.dto";

export class EmployeeService extends AxiosService {
  constructor() {
    super("http://localhost:8080/employee");
  }

  async create(employeeData: EmployeeDto, token: string): Promise<void> {
    await this.rest.post("/", employeeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getById(id: string, token: string): Promise<EmployeeDto> {
    const res = await this.rest.get(`/getEmployeeById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  async getAll(institutionId: string, token: string): Promise<EmployeeDto[]> {
    const res = await this.rest.get(`/getEmployees?institutionId=${encodeURIComponent(institutionId)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  async update(employeeData: EmployeeDto, token: string): Promise<void> {
    await this.rest.put("/updateEmployee", employeeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async delete(id: string, token: string): Promise<void> {
    await this.rest.delete(`/deleteEmployee/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
