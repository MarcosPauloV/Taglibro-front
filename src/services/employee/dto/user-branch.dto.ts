import { Role } from "../enum/role";

export interface UserBranchDTO {
  brachId: string;
  userId: string;
  role: Role;
}
