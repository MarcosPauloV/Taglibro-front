import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { InstitutionService } from "../services/institution/institution.service";
import { CNPJ } from "../utils/masks/cnpj";
import { LegalNature } from "../services/institution/enum/lega-nature";
import { useStorage } from "../hooks/storage/use-sorage";

function RegisteInstitution() {
  const institution = new InstitutionService();

  const { getItem } = useStorage();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [institutionData, setInstitutionData] = useState({
    name: "",
    cnpj: "",
    password: "",
    legalNature: LegalNature.PRIVATE,
  });

  const handleInstitutionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    if (name === "cnpj") {
      value = CNPJ(value);
    }

    setInstitutionData({ ...institutionData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...institutionData };
    institution.create(data, getItem("token"));
  };

  return (
    <div className="flex items-center justify-center w-screen h-[80vh] bg-gray-100">
      <div className="flex flex-col justify-center w-full max-w-lg p-8 bg-white rounded-md shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">Registro da Instituição</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome da Instituição
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={institutionData.name}
              onChange={handleInstitutionChange}
            />
          </div>
          <div>
            <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
              CNPJ
            </label>
            <input
              id="cnpj"
              name="cnpj"
              type="text"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={institutionData.cnpj}
              onChange={handleInstitutionChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={institutionData.password}
                onChange={handleInstitutionChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="legalNature" className="block text-sm font-medium text-gray-700">
              Natureza Jurídica
            </label>
            <select
              id="legalNature"
              name="legalNature"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={institutionData.legalNature}
              onChange={handleInstitutionChange}
            >
              <option value={LegalNature.PRIVATE}>Privada</option>
              <option value={LegalNature.PUBLIC}>Pública</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisteInstitution;
