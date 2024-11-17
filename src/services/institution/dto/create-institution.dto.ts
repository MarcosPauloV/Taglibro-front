export interface CreateInstitutionDto {
  name: string;
  cnpj: string;
  legalNature: LegalNature;
  password: string;
}

export enum LegalNature {
  "PRIVATE" = "PRIVATE",
  "PUBLIC" = "PUBLIC",
}
