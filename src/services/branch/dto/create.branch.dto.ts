import { AddressDto } from "./adress.dto";

export interface CreateBranchDto {
  name: string;
  cnpj: string;
  slug: string;
  address: AddressDto;
}
