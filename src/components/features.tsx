import { BookOpen, Users, Search, Calendar, ClipboardList, FileText } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Organização Inteligente de Notas",
    description: "Classifique e registre notas por disciplinas, turmas e períodos, de forma eficiente e segura.",
  },
  {
    icon: Users,
    title: "Gestão de Alunos",
    description: "Acompanhe o desempenho dos alunos com históricos de notas e faltas centralizados.",
  },
  {
    icon: Search,
    title: "Busca Rápida",
    description: "Encontre rapidamente registros de notas, faltas e relatórios com nossa busca avançada.",
  },
  {
    icon: Calendar,
    title: "Planejamento Escolar",
    description: "Integre cronogramas de provas, trabalhos e reuniões com um calendário intuitivo.",
  },
  {
    icon: ClipboardList,
    title: "Relatórios Personalizados",
    description: "Gere relatórios detalhados para acompanhar o progresso e frequência dos alunos.",
  },
  {
    icon: FileText,
    title: "Suporte a Diversos Formatos",
    description: "Adicione observações em texto, imagens e documentos nos registros de aula.",
  },
];

function Features() {
  return (
    <section id="sobre" className="py-20 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Ferramentas para Gestão Escolar</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            Tudo o que você precisa para organizar e gerenciar notas e faltas de alunos em uma única plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(feature => (
            <div key={feature.title} className="relative group h-60">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex flex-col justify-between h-full p-6 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md">
                <feature.icon className="w-10 h-10 mb-4 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
