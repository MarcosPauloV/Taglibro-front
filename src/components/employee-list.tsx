import { EmployeeDto } from "../services/employee/dto/employee.dto";

interface EmployeeListProps {
  employees: EmployeeDto[];
}

export function EmployeeList({ employees }: EmployeeListProps) {
  if (!Array.isArray(employees) || employees.length === 0) {
    return (
      <div className="flex flex-col items-center py-10 bg-gray-100">
        <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl">
          <h1 className="mb-6 text-3xl font-semibold text-center text-gray-800">Lista de Funcionários</h1>
          <p className="text-center text-gray-500">Nenhum funcionário encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl">
        <h1 className="mb-6 text-3xl font-semibold text-center text-gray-800">Lista de Usuários e Alunos</h1>
        <ul className="space-y-4">
          {employees.map(item => (
            <li
              key={item.id}
              className="flex items-center justify-between p-4 transition border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:shadow-md"
            >
              <span className="text-lg font-medium text-gray-700">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
