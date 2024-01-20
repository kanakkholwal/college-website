"use server";
import { Button } from "@/components/ui/button";
import dbConnect from "src/lib/dbConnect";
import CourseModel from "src/models/course";

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import ResultModel from "src/models/result";

import { revalidatePath } from "next/cache";
import NewCourseForm from "./form";

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
            <CardFooter>
                <Button type="submit">
                    Create Course
                </Button>
            </CardFooter>
        </Card>

    </>
}