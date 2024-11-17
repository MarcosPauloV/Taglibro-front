import AxiosController from "../axios.controller";
import { CreateInstitutionDto } from "./dto/create-institution.dto";

export class InstitutionService extends AxiosController {
  constructor() {
    super("http://localhost:8080/institution");
  }

  async registerInstitution(institutionData: CreateInstitutionDto): Promise<void> {
    const intitution = await this.rest.post("/", institutionData);

    console.log(intitution);
  }
}
