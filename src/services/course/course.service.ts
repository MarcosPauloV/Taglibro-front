import AxiosService from "../axios.service";
import { CourseCreateDTO } from "./dto/course.create.dto";
import { CourseDTO } from "./dto/course.dto";
import { CourseUpdateDTO } from "./dto/course.update.dto";

export class CourseService extends AxiosService {
  constructor() {
    super("http://localhost:8080/course");
  }

  async getAll(branchId: string, token: string): Promise<CourseDTO[]> {
    const courses = await this.rest.get("/", {
      headers: {
        Authorization: `Bearer ${token}`,
        branchid: branchId,
      },
    });

    console.log(courses.data);

    return courses.data;
  }

  async getById(id: string, token: string): Promise<CourseDTO> {
    console.log("id: ", id);
    console.log("token: ", token);
    const course = await this.rest.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return course.data;
  }

  async create(course: CourseCreateDTO, token: string): Promise<CourseDTO> {
    return await this.rest.post("/", course, {
      headers: {
        Authorization: `Bearer ${token}`,
        branchid: course.branchId,
      },
    });
  }

  async update(id: string, course: CourseUpdateDTO, token: string): Promise<CourseDTO> {
    return await this.rest.put(`/courses/${id}`, course, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async delete(id: string, token: string): Promise<void> {
    return await this.rest.delete(`/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
