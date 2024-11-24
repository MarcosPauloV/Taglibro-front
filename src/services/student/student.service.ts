import AxiosService from "../axios.service";
import { StudentCreateDTO } from "./dto/student.create.dto";
import { StudentDTO } from "./dto/student.dto";
import { StudentUpdateDto } from "./dto/student.update.dto";

export class StudentService extends AxiosService {
  constructor() {
    super("http://localhost:8080/");
  }

  async getAll(token: string): Promise<StudentDTO[]> {
    return this.rest.get("users/", {
      headers: {
        Authorization: token,
      },
    });
  }

  async getById(id: string, token: string): Promise<StudentDTO> {
    return this.rest.get(`users/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  async create(student: StudentCreateDTO, courseId: string, token: string): Promise<StudentDTO> {
    const user: StudentDTO = await this.rest.post("users/", student, {
      headers: {
        Authorization: token,
      },
    });

    const userCourse = await this.rest.post(
      "/user-course",
      {
        userId: user.id,
        courseId: courseId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return user;
  }

  async update(id: string, student: StudentUpdateDto, token: string): Promise<StudentDTO> {
    return this.rest.put(`users/${id}`, student, {
      headers: {
        Authorization: token,
      },
    });
  }

  async delete(id: string, token: string): Promise<void> {
    return this.rest.delete(`users/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  }
}
