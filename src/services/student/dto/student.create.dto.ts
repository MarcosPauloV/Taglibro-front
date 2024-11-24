export interface StudentCreateDTO {
  name: string;
  rg: string;
  cpf: string;
  bornDate: Date;
  phoneNumber: string;
  email: string;
  password: string;
  adressDto: {
    country: string;
    city: string;
    state: string;
    neighborhood: string;
    number: number;
    CEP: string;
    street: string;
  };
}
