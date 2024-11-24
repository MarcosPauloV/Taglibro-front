export interface UseCourseDTO {
  courseId: string | null;
  getCourse: () => string | null;
  setCourse: (id: string) => void;
  clearCourse: () => void;
}
