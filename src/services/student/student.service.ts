import AxiosService from "../axios.service";

export class StudentService extends AxiosService {
  constructor() {
    super("http://localhost:3000/students");
  }

  async getAll(token: string): Promise<StudentDTO[]> {
    return this.rest.get("/", {
      headers: {
        Authorization: token,
      },
    });
  }

  async getById(id: string, token: string): Promise<StudentDTO> {
    return this.rest.get(`/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  async create(student: StudentCreateDTO, token: string): Promise<StudentDTO> {
    return this.rest.post("/students", student, {
      headers: {
        Authorization: token,
      },
    });
  }

  async update(id: string, student: StudentUpdateDTO, token: string): Promise<StudentDTO> {
    return this.rest.put(`/students/${id}`, student, {
      headers: {
        Authorization: token,
      },
    });
  }

  async delete(id: string, token: string): Promise<void> {
    return this.rest.delete(`/students/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  }
}
