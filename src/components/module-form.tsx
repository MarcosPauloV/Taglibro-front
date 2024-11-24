import { useState, useEffect, FormEvent, Dispatch, SetStateAction } from "react";
import { ModuleService } from "../services/module/module.service";
import { CreateModuleDto } from "../services/module/dto/module.create.dto";
import { ModuleDto } from "../services/module/dto/module.dto";
import useCourseStore from "../hooks/use-course/use-course";

interface ModuleFormProps {
  modules: ModuleDto[];
  setModules: Dispatch<SetStateAction<ModuleDto[]>>;
}

export function ModuleForm({ modules, setModules }: ModuleFormProps) {
  const { getCourse } = useCourseStore();
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(0);
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState(0);

  const courseId = getCourse();
  const moduleService = new ModuleService();

  // Adiciona um módulo ao estado
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      return;
    }

    try {
      if (!courseId) {
        throw new Error("Curso não encontrado.");
      }

      const newModule: CreateModuleDto = {
        name,
        duration,
        subject,
        grade,
        courseId,
      };

      console.log("Payload enviado:", newModule);

      const data = await moduleService.create(newModule, token);
      setModules([...modules, data]);

      alert("Módulo adicionado com sucesso!");
      resetForm();
    } catch (error) {
      console.error("Erro ao adicionar módulo:", error);
      alert("Falha ao adicionar módulo.");
    }
  };

  const resetForm = () => {
    setName("");
    setDuration(0);
    setSubject("");
    setGrade(0);
  };

  const inputClass =
    "mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Adicionar Módulo</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome do Módulo
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className={inputClass}
              placeholder="Digite o nome do módulo"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duração (horas)
            </label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              required
              className={inputClass}
              placeholder="Digite a duração em horas"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Assunto
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
              className={inputClass}
              placeholder="Digite o assunto do módulo"
            />
          </div>
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
              Série/Ano
            </label>
            <input
              id="grade"
              type="number"
              value={grade}
              onChange={e => setGrade(Number(e.target.value))}
              required
              className={inputClass}
              placeholder="Digite a série ou ano"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-white transition bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Adicionar Módulo
          </button>
        </form>
      </div>
    </div>
  );
}
