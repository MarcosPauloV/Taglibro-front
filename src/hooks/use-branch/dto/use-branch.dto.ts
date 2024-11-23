export interface UseBranchDTO {
  branchId: string | null;
  getBranch: () => string | null;
  setBranch: (id: string) => void;
  clearBranch: () => void;
}
