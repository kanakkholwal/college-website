import { ChapterType, CourseType, booksAndRefType, prevPaperType } from "src/models/course";

import { create } from "zustand";

type NewCourseFormState = CourseType & {
    addChapter: (chapter: ChapterType) => void;
    removeChapter: (index: number) => void;
    setName: (name: string) => void;
    setCode: (code: string) => void;
    setCredits: (credits: number) => void;
    setDepartment: (department: string) => void;
    setType: (type: CourseType["type"]) => void;
    addReference: (reference: booksAndRefType) => void;
    removeReference: (index: number) => void;
    addPrevPaper: (prevPaper: prevPaperType) => void;
    removePrevPaper: (index: number) => void;

};
export const useNewCourseForm = create<NewCourseFormState>((set) => ({
    name: "",
    code: "",
    credits: 0,
    department: "",
    type: "core",
    chapters: [],
    books_and_references: [],
    prev_papers: [],
    addChapter: (chapter: ChapterType) => set((state) => ({ chapters: [...state.chapters, chapter] })),
    removeChapter: (index: number) => set((state) => ({ chapters: state.chapters.filter((_, i) => i !== index) })),
    setName: (name: string) => set({ name }),
    setCode: (code: string) => set({ code }),
    setCredits: (credits: number) => set({ credits }),
    setDepartment: (department: string) => set({ department }),
    setType: (type: CourseType["type"]) => set({ type }),
    addReference: (reference: booksAndRefType) => set((state) => ({ books_and_references: [...state.books_and_references, reference] })),
    removeReference: (index: number) => set((state) => ({ books_and_references: state.books_and_references.filter((_, i) => i !== index) })),
    addPrevPaper: (prevPaper: prevPaperType) => set((state) => ({ prev_papers: [...state.prev_papers, prevPaper] })),
    removePrevPaper: (index: number) => set((state) => ({ prev_papers: state.prev_papers.filter((_, i) => i !== index) })),

}));