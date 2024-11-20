import { Address } from "./adress.dto";

export interface Branch {
  id: string;
  name: string;
  cnpj: string;
  institutionId: string;
  addressId: string;
  slug: string;
  address: Address;
  createdAt: string;
  updatedAt: string;
}
