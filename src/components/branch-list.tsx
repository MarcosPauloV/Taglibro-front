import { Dispatch, SetStateAction, useEffect } from "react";
import { BranchService } from "../services/branch/branch.service";
import { BranchDto } from "../services/branch/dto/branch.dto";

type BranchListProps = {
  branches: BranchDto[];
  setBranches: Dispatch<SetStateAction<BranchDto[]>>;
};

export function BranchList({ branches, setBranches }: BranchListProps) {
  const branchService = new BranchService();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await branchService.getAll();
        setBranches(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [setBranches]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="mb-4 text-2xl font-semibold text-gray-800">Lista de Filiais</h1>
      {branches.length > 0 ? (
        <ul className="space-y-2">
          {branches.map((item, index) => (
            <li key={index} className="px-4 py-2 bg-blue-100 border border-blue-200 rounded-md hover:bg-blue-200">
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nenhuma filial encontrada.</p>
      )}
    </div>
  );
}
