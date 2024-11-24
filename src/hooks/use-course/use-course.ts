import { create } from "zustand";
import { UseCourseDTO } from "./dto/use-course.dto";

const useCourseStore = create<UseCourseDTO>((set, get) => ({
  courseId: null,
  getCourse: () => get().courseId,
  setCourse: (id: string) => set({ courseId: id }),
  clearCourse: () => set({ courseId: null }),
}));

export default useCourseStore;
