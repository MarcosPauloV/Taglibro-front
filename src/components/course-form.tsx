import { ChangeEvent, FormEvent, useState } from "react";
import { CourseService } from "../services/course/course.service";
import { useStorage } from "../hooks/use-storage/use-sorage";
import useBranchStore from "../hooks/use-branch/use-branch";
import { CourseDTO } from "../services/course/dto/course.dto";
import { CourseCreateDTO } from "../services/course/dto/course.create.dto";

interface CourseFormProps {
  courses: any[];
  setCourses: (courses: any[]) => void;
}

export default function CourseForm({ courses, setCourses }: CourseFormProps) {
  const courseService = new CourseService();
  const { getItem } = useStorage();
  const branchId = useBranchStore(state => state.branchId);
  const [name, setName] = useState("");
  const [totalGrade, setTotalGrade] = useState<number | string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = getItem("token");
      if (!token) {
        throw new Error("Token não encontrado.");
      }

      if (!branchId) {
        throw new Error("BranchId não encontrado.");
      }

      const newCourse: CourseCreateDTO = {
        name,
        branchId,
        totalGrade: Number(totalGrade),
      };

      await courseService.create(newCourse, token);

      // Garante que courses é um array antes de atualizar
      setCourses([...(Array.isArray(courses) ? courses : []), newCourse]);

      setName("");
      setTotalGrade("");

      alert("Curso criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      alert("Falha ao criar o curso.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between max-w-md p-6 mx-auto bg-white rounded-lg shadow-md"
    >
      <h2 className="mb-4 text-xl font-semibold text-center">Adicionar Novo Curso</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome do Curso
          </label>
          <input
            type="text"
            id="courseName"
            value={name}
            onChange={e => setName(e.target.value)}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Digite o nome do curso"
          />
        </div>
        <div>
          <label htmlFor="totalGrade" className="block text-sm font-medium text-gray-700">
            Nota Total
          </label>
          <input
            type="number"
            id="totalGrade"
            value={totalGrade}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTotalGrade(e.target.value)}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Digite a nota total"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Adicionar Curso
      </button>
    </form>
  );
}
