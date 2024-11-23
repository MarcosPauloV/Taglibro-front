import { LegalNature } from "../enum/lega-nature";

export interface InstitutionUpdateDTO {
  name?: string;
  cnpj?: string;
  legalNature?: LegalNature;
  password?: string;
}
