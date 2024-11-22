import { AddressDto } from "./adress.dto";

export interface BranchDto {
  name: string;
  cnpj: string;
  institutionId: string;
  slug: string;
  address: AddressDto;
  createdAt: string;
  updatedAt: string;
}
