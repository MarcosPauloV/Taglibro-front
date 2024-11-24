import { ChangeEvent, FormEvent, useState } from "react";
import { BranchService } from "../services/branch/branch.service";
import { CNPJ } from "../utils/masks/cnpj";
import useBranchStore from "../hooks/use-branch/use-branch";
import { BranchDto } from "../services/branch/dto/branch.dto";
import { useStorage } from "../hooks/use-storage/use-sorage";

interface BranchFormProps {
  branches: any[];
  setBranches: (branches: BranchDto[]) => void;
}

export function BranchForm({ branches, setBranches }: BranchFormProps) {
  const branchService = new BranchService();
  const { getItem } = useStorage();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [address, setAddress] = useState({
    country: "",
    city: "",
    state: "",
    neighborhood: "",
    number: 0,
    CEP: "",
    street: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = getItem("token");
      if (!token) {
        throw new Error("Token não encontrado.");
      }

      const newBranch = {
        name,
        slug,
        cnpj,
        address,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await branchService.create(newBranch, getItem("token"));

      setBranches([...branches, newBranch]);

      setName("");
      setSlug("");
      setCnpj("");
      setAddress({
        country: "",
        city: "",
        state: "",
        neighborhood: "",
        number: 0,
        CEP: "",
        street: "",
      });

      alert("Filial criada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Falha ao criar a filial.");
    }
  };

  const handleCnpjChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedCnpj = CNPJ(e.target.value);
    setCnpj(formattedCnpj);
  };

  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "-");
    setSlug(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full p-6 bg-white rounded-lg shadow-md">
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
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={handleSlugChange}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Digite o slug (sem espaços)"
            required
            pattern="^[a-zA-Z0-9_-]+$"
            title="O slug deve conter apenas letras, números, underscores (_) ou hifens (-)."
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
            onChange={handleCnpjChange}
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
                type={field === "number" ? "number" : "text"}
                id={field}
                value={address[field]}
                onChange={e => setAddress({ ...address, [field]: e.target.value })}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder={`Digite o ${field === "CEP" ? "CEP" : field}`}
              />
            </div>
          ))}
        </fieldset>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Adicionar Filial
      </button>
    </form>
  );
}
