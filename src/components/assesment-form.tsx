import { useState, useEffect, FormEvent } from "react";
import { CreateAssessmentDto } from "../services/assesment/dto/assesment.create.dto";
import { AssesmentType } from "../services/assesment/enum/assesment.enum";
import { AssesmentService } from "../services/assesment/assesment.service";
import { useStorage } from "../hooks/use-storage/use-sorage";
import useBranchStore from "../hooks/use-branch/use-branch";
import useCourseStore from "../hooks/use-course/use-course";
import { EmployeeService } from "../services/employee/employee.service";
import { EmployeeDto } from "../services/employee/dto/employee.dto";
import { ModuleDto } from "../services/module/dto/module.dto";

interface AssessmentFormProps {
  modules: ModuleDto[] | undefined; // Certifique-se de que pode ser undefined
}

export function AssessmentForm({ modules }: AssessmentFormProps) {
  const { getItem } = useStorage();
  const { getBranch } = useBranchStore();
  const { getCourse } = useCourseStore();
  const [moduleId, setModuleId] = useState("");
  const [userId, setUserId] = useState("");
  const [assesmentName, setAssesmentName] = useState("");
  const [type, setType] = useState<AssesmentType>(AssesmentType.FREQUENCY);
  const [frequency, setFrequency] = useState<number | "">("");
  const [grade, setGrade] = useState<number | "">("");
  const [users, setUsers] = useState<EmployeeDto[]>([]);

  const employeeService = new EmployeeService();
  const assesmentService = new AssesmentService();

  const courseId = getCourse();
  const token = getItem("token");
  const branchId = getBranch();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token || !courseId) {
        return;
      }

      try {
        const data = await employeeService.getStudentsByCourse(courseId, token);
        console.log("Alunos encontrados:", data);
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const assessment: CreateAssessmentDto = {
      moduleId,
      userId,
      assesmentName,
      type,
      frequency: type === AssesmentType.FREQUENCY && frequency !== "" ? Number(frequency) : undefined,
      grade: type === AssesmentType.GRADE && grade !== "" ? Number(grade) : undefined,
    };

    if (!token || !branchId) {
      return;
    }

    try {
      const ass = await assesmentService.create(assessment, branchId, token);
      console.log(ass);
      resetForm();
    } catch (error) {
      console.error("Erro ao criar avaliação:", error);
    }
  };

  const resetForm = () => {
    setModuleId("");
    setUserId("");
    setAssesmentName("");
    setType(AssesmentType.FREQUENCY);
    setFrequency("");
    setGrade("");
  };

  const inputClass =
    "mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Criar Avaliação</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seleção de módulo */}
          <div>
            <label htmlFor="moduleId" className="block text-sm font-medium text-gray-700">
              Módulo
            </label>
            <select
              id="moduleId"
              value={moduleId}
              onChange={e => setModuleId(e.target.value)}
              required
              className={inputClass}
            >
              <option value="" disabled>
                Selecione um módulo
              </option>
              {modules?.map(module => (
                <option key={module.id} value={module.id}>
                  {module.name}
                </option>
              ))}
            </select>
          </div>

          {/* Nome da avaliação */}
          <div>
            <label htmlFor="assesmentName" className="block text-sm font-medium text-gray-700">
              Nome da Avaliação
            </label>
            <input
              id="assesmentName"
              type="text"
              value={assesmentName}
              onChange={e => setAssesmentName(e.target.value)}
              required
              className={inputClass}
              placeholder="Digite o nome da avaliação"
            />
          </div>

          {/* Tipo de avaliação */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Tipo de Avaliação
            </label>
            <select
              id="type"
              value={type}
              onChange={e => setType(e.target.value as AssesmentType)}
              required
              className={inputClass}
            >
              <option value={AssesmentType.FREQUENCY}>Frequência</option>
              <option value={AssesmentType.GRADE}>Nota</option>
            </select>
          </div>

          {/* Campos dinâmicos */}
          {type === AssesmentType.FREQUENCY && (
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                Frequência
              </label>
              <input
                id="frequency"
                type="number"
                value={frequency}
                onChange={e => setFrequency(Number(e.target.value))}
                required
                className={inputClass}
                placeholder="Digite a frequência"
              />
            </div>
          )}
          {type === AssesmentType.GRADE && (
            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                Nota
              </label>
              <input
                id="grade"
                type="number"
                value={grade}
                onChange={e => setGrade(Number(e.target.value))}
                required
                className={inputClass}
                placeholder="Digite a nota"
              />
            </div>
          )}

          {/* Botão de submissão */}
          <button
            type="submit"
            className="w-full px-4 py-3 text-white transition bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Criar Avaliação
          </button>
        </form>
      </div>
    </div>
  );
}
