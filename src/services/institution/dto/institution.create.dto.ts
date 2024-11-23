import { LegalNature } from "../enum/lega-nature";

export interface InstitutionCreateDTO {
  name: string;
  cnpj: string;
  legalNature: LegalNature;
  password: string;
}
