import { create } from "zustand";
import { UseBranchDTO } from "./dto/use-branch.dto";

const useBranchStore = create<UseBranchDTO>((set, get) => ({
  branchId: null,
  getBranch: () => get().branchId,
  setBranch: (id: string) => set({ branchId: id }),
  clearBranch: () => set({ branchId: null }),
}));

export default useBranchStore;
