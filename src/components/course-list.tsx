import { useNavigate } from "react-router-dom";
import { CourseDTO } from "../services/course/dto/course.dto";
import useCourseStore from "../hooks/use-course/use-course";

type CourseListProps = {
  courses: CourseDTO[];
};

export function CourseList({ courses }: CourseListProps) {
  const navigate = useNavigate();
  const { setCourse } = useCourseStore();
  const handleNavigate = (id: string) => {
    setCourse(id);
    navigate(`/course`);
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl">
        <h1 className="mb-6 text-3xl font-semibold text-center text-gray-800">Lista de Cursos</h1>
        {courses.length > 0 ? (
          <ul className="space-y-4">
            {courses.map((course, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 transition border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:shadow-md"
              >
                <div>
                  <h2 className="text-lg font-medium text-gray-700">{course.name}</h2>
                  <p className="text-sm text-gray-500">Nota Total: {course.totalGrade}</p>
                </div>
                <button
                  className="px-4 py-2 text-sm font-medium text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => handleNavigate(course.id)}
                >
                  Acessar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Nenhum curso encontrado.</p>
        )}
      </div>
    </div>
  );
}
