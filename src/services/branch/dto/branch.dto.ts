import { AddressDto } from "./adress.dto";

export interface BranchDto {
  id: string;
  name: string;
  cnpj: string;
  institutionId: string;
  slug: string;
  address: AddressDto;
}
