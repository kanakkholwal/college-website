
import dbConnect from "src/lib/dbConnect";
import CourseModel from "src/models/course";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import ResultModel from "src/models/result";
import NewCourseForm from "./form";

export const metadata:Metadata= {
    title: "New Course | Admin",
    description: "Create a new course"

}

export default async function CoursesPage() {
    await dbConnect();
    const branches = await ResultModel.distinct("branch");

    async function saveCourse(formData: FormData) {
        "use server"
        await dbConnect();
        console.log(formData);
        const newCourse = {
            name: formData.get("name"),
            code: formData.get("code"),
            credits: formData.get("credits"),
            department: formData.get("department"),
            type: formData.get("type") || "core",
            content: formData.get("content") || [],
            prerequisites: formData.get("prerequisites") || [],
            books_and_references: formData.get("books_and_references") || [],
            prev_papers: formData.get("prev_papers") || [],

        }
        const course = await CourseModel.create(newCourse);
        console.log(course);
        revalidatePath("/admin/courses");
        // revalidatePath("/syllabus/[code]");


        return course;
    }

    return <>

        <Card className="m-4 mt-10">
            <CardHeader>
                <CardTitle>
                    New Course
                </CardTitle>
                <CardDescription>
                    Create a new course
                </CardDescription>
            </CardHeader>
            <NewCourseForm />
        
        </Card>

    </>
}