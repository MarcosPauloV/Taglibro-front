import { LegalNature } from "../enum/lega-nature";

export interface InstitutionDto {
  name: string;
  cnpj: string;
  legalNature: LegalNature;
  password: string;
}
