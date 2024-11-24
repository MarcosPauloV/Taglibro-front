import { AssesmentType } from "../enum/assesment.enum";

export interface AssesmentDTO {
  id: number;
  moduleId: string;
  userId: string;
  assesmentName: string;
  type: AssesmentType;
  frequency?: number;
  grade?: number;
}
