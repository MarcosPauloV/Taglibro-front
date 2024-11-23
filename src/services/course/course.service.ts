import AxiosService from "../axios.service";
import { CourseCreateDTO } from "./dto/course.create.dto";
import { CourseDTO } from "./dto/course.dto";
import { CourseUpdateDTO } from "./dto/course.update.dto";

export class CourseService extends AxiosService {
  constructor() {
    super("http://localhost:3000/courses");
  }

  async getAll(token: string): Promise<CourseDTO[]> {
    return this.rest.get("/", {
      headers: {
        Authorization: token,
      },
    });
  }

  async getById(id: string, token: string): Promise<CourseDTO> {
    return this.rest.get(`/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  async create(course: CourseCreateDTO, token: string): Promise<CourseDTO> {
    return this.rest.post("/courses", course, {
      headers: {
        Authorization: token,
      },
    });
  }

  async update(id: string, course: CourseUpdateDTO, token: string): Promise<CourseDTO> {
    return this.rest.put(`/courses/${id}`, course, {
      headers: {
        Authorization: token,
      },
    });
  }

  async delete(id: string, token: string): Promise<void> {
    return this.rest.delete(`/courses/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  }
}
