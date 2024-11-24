import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBranchStore from "../hooks/use-branch/use-branch";
import { useStorage } from "../hooks/use-storage/use-sorage";
import { EmployeeList } from "../components/employee-list";
import { EmployeeService } from "../services/employee/employee.service";
import { EmployeeDto } from "../services/employee/dto/employee.dto";
import { EmployeeForm } from "../components/emplouee-form";
import { CourseList } from "../components/course-list";
import { CourseDTO } from "../services/course/dto/course.dto";
import { CourseService } from "../services/course/course.service";
import CourseForm from "../components/course-form";

function Branch() {
  const branchId = useBranchStore(state => state.getBranch());
  const { clear, getItem } = useStorage();
  const navigate = useNavigate();
  const employeeService = new EmployeeService();
  const courseService = new CourseService();
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);
  const [courses, setCourses] = useState<CourseDTO[]>([]);
  const [loading, setLoading] = useState(true);

  // Obter informações do localStorage
  const role = getItem("rule");
  const institutionId = getItem("institutionId");

  useEffect(() => {
    if (!branchId) {
      clear();
      navigate("/login");
    }
  }, [branchId]);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!branchId) return;

      try {
        setLoading(true);
        const token = getItem("token");
        if (!token) throw new Error("Token não encontrado");

        const data = await employeeService.getAll(branchId, token);
        setEmployees(data);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [branchId]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!branchId) return;

      try {
        const data = await courseService.getAll(branchId, getItem("token"));
        console.log("awaw: ", data);
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  if (!branchId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Redirecionando...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="ml-2 text-xl font-bold text-gray-900">Usuários, Alunos e Cursos</h1>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <section className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {role === "ADMIN" || institutionId ? (
            <>
              {/* Admin View */}
              <div className="space-y-4">
                <EmployeeList employees={employees} />
                <CourseList courses={courses} />
              </div>
              <div className="space-y-4">
                <EmployeeForm employees={employees} setEmployees={setEmployees} courses={courses} />
                <CourseForm courses={courses} setCourses={setCourses} />
              </div>
            </>
          ) : (
            <>
              {/* Non-Admin View */}
              <div className="space-y-4">
                <CourseList courses={courses} />
              </div>
              <div className="space-y-4">
                <CourseForm courses={courses} setCourses={setCourses} />
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Branch;
