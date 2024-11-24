import { useEffect, useState } from "react";
import { BranchService } from "../services/branch/branch.service";
import { useStorage } from "../hooks/use-storage/use-sorage";
import { BranchDto } from "../services/branch/dto/branch.dto";
import useBranchStore from "../hooks/use-branch/use-branch";
import { BranchList } from "../components/branch-list";

function Branchs() {
  const branchService = new BranchService();
  const { getItem } = useStorage();
  const [branchs, setBranchs] = useState<BranchDto[]>([]);
  const setBranchId = useBranchStore(state => state.setBranch);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold">Filiais</h1>

        <BranchList branches={branchs} setBranches={setBranchs} />
      </div>
    </>
  );
}

export default Branchs;
