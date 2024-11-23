export interface CourseUpdateDTO {
  name?: string; // Nome é opcional.
  branchId?: string; // branchId é opcional.
  totalGrade?: number; // Nota total é opcional.
  updatedAt: Date; // Atualizado automaticamente para refletir a alteração.
}
