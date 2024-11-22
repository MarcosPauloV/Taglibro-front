import React, { useState, FormEvent, useEffect, Dispatch, SetStateAction } from "react";
import { EmployeeService } from "../services/employee/employee.service";
import { EmployeeDto } from "../services/employee/dto/employee.dto";

interface EmployeeFormProps {
  employees: EmployeeDto[];
  setEmployees: Dispatch<SetStateAction<EmployeeDto[]>>;
}

export function EmployeeForm({ employees, setEmployees }: EmployeeFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branches, setBranches] = useState<{ id: string; name: string }[]>([]);

  const employeeService = new EmployeeService();

  useEffect(() => {
    const fetchBranches = async () => {
      const token = localStorage.getItem("token");
      const companyId = localStorage.getItem("companyId");

      if (!token || !companyId) {
        console.error("Token ou ID da empresa não encontrados no localStorage.");
        return;
      }

      try {
        const data = await employeeService.getAll(companyId, token);
        setBranches(data);
      } catch (error) {
        console.error("Erro ao buscar as filiais:", error);
      }
    };

    fetchBranches();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");

    if (!token || !companyId) {
      console.error("Token ou ID da empresa não encontrados no localStorage.");
      return;
    }

    try {
      const newEmployee = {
        id: "",
        name,
        email,
        phone,
        branchId,
        companyId,
      };

      await employeeService.create(newEmployee, token);

      setEmployees([...employees, newEmployee]);

      alert("Funcionário adicionado com sucesso!");
      setName("");
      setEmail("");
      setPhone("");
      setBranchId("");
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
      alert("Falha ao adicionar funcionário.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome Completo
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Digite o nome completo"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Digite o email"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Telefone
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Digite o telefone"
        />
      </div>
      <div>
        <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
          Filial
        </label>
        <select
          id="branch"
          value={branchId}
          onChange={e => setBranchId(e.target.value)}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Selecione uma filial</option>
          {branches.map(branch => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Adicionar Funcionário
      </button>
    </form>
  );
}
