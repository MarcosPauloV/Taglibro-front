import { LegalNature } from "../enum/lega-nature";

export interface InstitutionDto {
  id: string;
  name: string;
  cnpj: string;
  legalNature: LegalNature;
  password: string;
}
