import { useNavigate } from "react-router-dom";
import { CreateAssessmentDto } from "../services/assesment/dto/assesment.create.dto";
import { AssesmentType } from "../services/assesment/enum/assesment.enum";
import { AssesmentService } from "../services/assesment/assesment.service";
import useBranchStore from "../hooks/use-branch/use-branch";
import useCourseStore from "../hooks/use-course/use-course";
import { useStorage } from "../hooks/use-storage/use-sorage";
import { useState, useEffect } from "react";
import useModuleStore from "../hooks/use-module/use-module";

export function AssessmentList() {
  const navigate = useNavigate();
  const { getBranch } = useBranchStore();
  const { getCourse } = useCourseStore();
  const { getItem } = useStorage();
  const [filteredAssessments, setFilteredAssessments] = useState<CreateAssessmentDto[]>();

  const branchId = getBranch();
  const courseId = getCourse();
  const token = getItem("token");
  const assessmentService = new AssesmentService();

  useEffect(() => {
    if (!branchId || !courseId || !token) {
      return;
    }

    const fetchAssessments = async () => {
      try {
        const data = await assessmentService.findByModule(branchId, token);
        setFilteredAssessments(data);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
      }
    };

    fetchAssessments();
  }, [branchId, courseId, token]);

  const handleNavigate = (id: string) => {
    navigate(`/assessment/${id}`);
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl">
        <h1 className="mb-6 text-3xl font-semibold text-center text-gray-800">Lista de Avaliações</h1>
        <p className="text-center text-gray-500">Nenhuma avaliação encontrada.</p>
      </div>
    </div>
  );
}
