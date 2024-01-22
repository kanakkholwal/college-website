"use server";
import dbConnect from "src/lib/dbConnect";
import CourseModel from "src/models/course";

export async function addPrevPaper(code: string, year: number, exam: string, link: string) {
    await dbConnect();
    const course = await CourseModel.findOne({ code });
    if (!course) {
        return null;
    }
    if(course.prev_papers.find((paper) => paper.link === link)) {
        return course;
    }
    course.prev_papers.push({
        exam,
        year,
        link
    })
    await course.save();

    return course;
}