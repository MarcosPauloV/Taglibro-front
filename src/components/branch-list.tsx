import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BranchService } from "../services/branch/branch.service";
import { BranchDto } from "../services/branch/dto/branch.dto";
import useBranchStore from "../hooks/use-branch/use-branch";
import { useStorage } from "../hooks/use-storage/use-sorage";

type BranchListProps = {
  branches: BranchDto[];
  setBranches: Dispatch<SetStateAction<BranchDto[]>>;
};

export function BranchList({ branches, setBranches }: BranchListProps) {
  const branchService = new BranchService();
  const setBranch = useBranchStore(state => state.setBranch);
  const navigate = useNavigate();
  const { getItem } = useStorage();
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await branchService.getAll(getItem("token"));
        setBranches(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [setBranches]);

  const handleNavigate = (id: string) => {
    setBranch(id);
    navigate(`/branch`);
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl">
        <h1 className="mb-6 text-3xl font-semibold text-center text-gray-800">Lista de Filiais</h1>
        {branches.length > 0 ? (
          <ul className="space-y-4">
            {branches.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 transition border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:shadow-md"
              >
                <span className="text-lg font-medium text-gray-700">{item.name}</span>
                <button
                  className="px-4 py-2 text-sm font-medium text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => handleNavigate(item.id)}
                >
                  Acessar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Nenhuma filial encontrada.</p>
        )}
      </div>
    </div>
  );
}
