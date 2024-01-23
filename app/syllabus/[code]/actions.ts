"use server";
import CourseModel, { booksAndRefType, prevPaperType } from "src/models/course";

export async function addPrev(code: string, paper:prevPaperType) {

    try {

        const course = await CourseModel.findOne({ code });
        if (!course) {
            return null;
        }
        if (course.prev_papers.find((p: prevPaperType) => p.link === paper.link)) {
            return course;
        }
        course.prev_papers.push(paper);
        await course.save();
        return course;
    } catch (err) {
        console.log(err);
        return null;

    }
}
export async function addRef(code: string,ref:booksAndRefType) {
    try {

        const course = await CourseModel.findOne({ code });
        if (!course) {
            return null;
        }
        if (course.books_and_references.find((r: booksAndRefType) => r.link === ref.link)) {
            return course;
        }
        course.books_and_references.push(ref);
        await course.save();
        return course;
    } catch (err) {
        console.log(err);
        return null;
    }

}