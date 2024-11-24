import { useEffect, useState } from "react";
import useCourseStore from "../hooks/use-course/use-course";
import { CourseService } from "../services/course/course.service";
import useBranchStore from "../hooks/use-branch/use-branch";
import { ModuleForm } from "../components/module-form";
import { ModuleList } from "../components/module-list";
import { ModuleDto } from "../services/module/dto/module.dto";
import { CourseDTO } from "../services/course/dto/course.dto";

function Course() {
  const { getCourse } = useCourseStore();
  const { getBranch } = useBranchStore();
  const courseService = new CourseService();
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<CourseDTO>({} as CourseDTO);

  useEffect(() => {
    const fetchCourse = async () => {
      const token = localStorage.getItem("token");
      const branchId = getBranch();
      const courseId = getCourse();

      if (!courseId) {
        setError("Curso não encontrado.");
        setLoading(false);
        return;
      }
      if (!branchId) {
        setError("Filial não encontrada.");
        setLoading(false);
        return;
      }
      if (!token) {
        setError("Token não encontrado.");
        setLoading(false);
        return;
      }

      try {
        const course = await courseService.getById(courseId, token);

        setCourse(course);
      } catch (err) {
        console.error("Erro ao buscar curso:", err);
        setError("Erro ao buscar os dados do curso.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [getBranch]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div>
      <ModuleForm modules={modules} setModules={setModules} />
      <ModuleList />
    </div>
  );
}

export default Course;
