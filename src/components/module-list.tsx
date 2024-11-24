import { useNavigate } from "react-router-dom";
import { ModuleService } from "../services/module/module.service";
import useCourseStore from "../hooks/use-course/use-course";
import { useStorage } from "../hooks/use-storage/use-sorage";
import { ModuleDto } from "../services/module/dto/module.dto";
import { Dispatch, useEffect } from "react";
import useModuleStore from "../hooks/use-module/use-module";

export function ModuleList() {
  const navigate = useNavigate();
  const { getItem } = useStorage();
  const moduleService = new ModuleService();
  const { setCourse, getCourse } = useCourseStore();
  const { setModulesS, modules } = useModuleStore();

  useEffect(() => {
    const fetchModules = async () => {
      const token = getItem("token");
      if (!token) {
        alert("Token não encontrado. Faça login novamente.");
        return;
      }

      try {
        const data = await moduleService.getAll(token);

        console.log(
          "Módulos encontrados:",
          data.filter(module => module.courseId === getCourse())
        );

        setModulesS(data.filter(module => module.courseId === getCourse()));
      } catch (error) {
        console.error("Erro ao buscar módulos:", error);
        alert("Falha ao buscar módulos.");
      }
    };

    fetchModules();
  }, []);

  const handleNavigate = (moduleId: string) => {
    setCourse(moduleId);
    navigate(`/assesment`);
  };

  const handleDelete = async (moduleId: string) => {
    const token = getItem("token");
    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      return;
    }

    try {
      await moduleService.delete(moduleId, token);
      alert("Módulo removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover módulo:", error);
      alert("Falha ao remover módulo.");
    }
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-xl">
        <h1 className="mb-6 text-3xl font-semibold text-center text-gray-800">Lista de Módulos</h1>
        {modules.length > 0 ? (
          <ul className="space-y-4">
            {modules.map((module, index) => (
              <li
                key={module.id || `module-${index}`} // Fallback para um índice único
                className="flex items-center justify-between p-4 transition border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:shadow-md"
              >
                <div>
                  <h2 className="text-lg font-medium text-gray-700">{module.name}</h2>
                  <p className="text-sm text-gray-500">
                    Name: {module.name} | Descrição: {module.subject} | Duração: {module.duration}h
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="px-4 py-2 text-sm font-medium text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => handleNavigate(module.id)}
                  >
                    Acessar
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-white transition bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={() => handleDelete(module.id)}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Nenhum módulo encontrado.</p>
        )}
      </div>
    </div>
  );
}
