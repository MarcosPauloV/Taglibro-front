import React, { useState } from "react";
import { BranchService } from "../services/branch/branch.service";
import { CNPJ } from "../utils/masks/cnpj";
import { useStorage } from "../hooks/storage/use-sorage";

interface BranchFormProps {
  employees: any[];
  setEmployees: React.Dispatch<React.SetStateAction<any[]>>;
}

export function BranchForm({ employees, setEmployees }: BranchFormProps) {
  const branchService = new BranchService();
  const { getItem } = useStorage();
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [address, setAddress] = useState({
    country: "",
    city: "",
    state: "",
    neighborhood: "",
    number: "",
    CEP: "",
    street: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token não encontrado.");
      }

      const newBranch = {
        name,
        cnpj,
        institutionId: getItem("institutionId"),
        slug: name.toLowerCase().replace(/ /g, "-"),
        address,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await branchService.create(newBranch);

      // Atualiza a lista de employees com a nova filial (se aplicável)
      setEmployees([...employees, newBranch]);

      setName("");
      setCnpj("");
      setAddress({
        country: "",
        city: "",
        state: "",
        neighborhood: "",
        number: "",
        CEP: "",
        street: "",
      });

      alert("Filial criada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Falha ao criar a filial.");
    }
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = CNPJ(e.target.value);
    setCnpj(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Adicionar Nova Filial</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome da Filial
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Digite o nome da filial"
          />
        </div>
        <div>
          <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
            CNPJ
          </label>
          <input
            type="text"
            id="cnpj"
            value={cnpj}
            onChange={handleCpfChange}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Digite o CNPJ da filial"
          />
        </div>

        <fieldset className="p-4 border">
          <legend className="text-sm font-medium text-gray-700">Endereço</legend>
          {(Object.keys(address) as Array<keyof typeof address>).map(field => (
            <div key={field} className="mt-4">
              <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                {field === "CEP" ? "CEP" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                id={field}
                value={address[field]}
                onChange={e => setAddress({ ...address, [field]: e.target.value })}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder={`Digite o ${field === "CEP" ? "CEP" : field}`}
              />
            </div>
          ))}
        </fieldset>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Adicionar Filial
        </button>
      </div>
    </form>
  );
}
