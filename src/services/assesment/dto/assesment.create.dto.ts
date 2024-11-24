import { AssesmentType } from "../enum/assesment.enum";

export interface CreateAssessmentDto {
  moduleId: string;
  userId: string;
  assesmentName: string;
  type: AssesmentType;
  frequency?: number;
  grade?: number;
}
