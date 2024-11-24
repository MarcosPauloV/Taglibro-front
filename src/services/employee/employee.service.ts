import { UseBranchDTO } from "../../hooks/use-branch/dto/use-branch.dto";
import AxiosService from "../axios.service";
import { EmployeeCreateDTO } from "./dto/employee.create.dto";

import { EmployeeDto } from "./dto/employee.dto";
import { UserBranchDTO } from "./dto/user-branch.dto";
import { Role } from "./enum/role";

export class EmployeeService extends AxiosService {
  constructor() {
    super("http://localhost:8080/");
  }

  async create(
    branchUserData: { branchId: string; role: Role },
    userData: EmployeeCreateDTO,
    token: string,
    courseId?: string
  ): Promise<EmployeeDto> {
    const user = await this.rest.post("users/", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (branchUserData.role === Role.STUDENT) {
      const userCourse = await this.rest.post(
        "/user-course",
        {
          userId: user.data.id,
          courseId: courseId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    }

    const branchUser = await this.rest.post(
      "branch-user/",
      {
        userId: user.data.id,
        branchId: branchUserData.branchId,
        role: branchUserData.role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return user.data;
  }

  async getStudentsByCourse(courseId: string, token: string): Promise<EmployeeDto[]> {
    const res = await this.rest.get(`/user-course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Usar Promise.all para lidar com as requisições assíncronas
    const users = await Promise.all(
      res.data.map(async (userCourse: any) => {
        const userResponse = await this.rest.get(`/users/${userCourse.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Retornar o usuário diretamente
        return userResponse.data;
      })
    );

    return users; // Retorna um array de usuários
  }

  async getById(id: string, token: string): Promise<EmployeeDto> {
    const res = await this.rest.get(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  async getAll(branchId: string, token: string): Promise<EmployeeDto[]> {
    try {
      // Busca os usuários associados à filial
      const response = await this.rest.get(`branch-user/${branchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Verifica se o response é válido e contém os dados esperados
      if (!response || !Array.isArray(response.data)) {
        throw new Error("Dados inválidos retornados pela API");
      }

      const userBranch: UserBranchDTO[] = response.data;

      // Busca os dados de cada usuário associado
      const users = await Promise.all(
        userBranch.map(async ub => {
          const userResponse = await this.rest.get(`users/${ub.userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!userResponse || !userResponse.data) {
            throw new Error(`Dados do usuário não encontrados para userId: ${ub.userId}`);
          }

          return userResponse.data; // Retorna os dados do usuário
        })
      );

      console.log("Usuários encontrados:", users);

      // Retorna a lista de usuários
      return users;
    } catch (error) {
      console.error("Erro ao buscar os usuários:", error);
      throw new Error("Não foi possível buscar os usuários.");
    }
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
