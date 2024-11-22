import { useEffect, useState } from "react";
import { useStorage } from "../hooks/storage/use-sorage";
import { EmployeeService } from "../services/employee/employee.service";
import { EmployeeDto } from "../services/employee/dto/employee.dto";

export function EmployeeList() {
  const employeeService = new EmployeeService();
  const { getItem } = useStorage();
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await employeeService.getAll(getItem("companyId"), getItem("token"));
        setEmployees(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="mb-4 text-2xl font-semibold text-gray-800">Lista de Funcionários</h1>
      {employees.length > 0 ? (
        <ul className="space-y-2">
          {employees.map(item => (
            <li key={item.id} className="px-4 py-2 bg-green-100 border border-green-200 rounded-md hover:bg-green-200">
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nenhum funcionário encontrado.</p>
      )}
    </div>
  );
}
