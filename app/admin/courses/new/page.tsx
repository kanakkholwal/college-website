"use server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import dbConnect from "src/lib/dbConnect";
import CourseModel from "src/models/course";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ResultModel from "src/models/result";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";


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
            <CardContent>
                <form className="grid gap-4 w-full" >
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input type="name" id="name" placeholder="Course Name" variant="fluid" required />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="code">Code</Label>
                        <Input type="code" id="code" placeholder="Course Code" variant="fluid" required />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="credits">Credits</Label>
                        <Slider defaultValue={[1]} max={4} step={1} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="department">Department</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Department" />
                            </SelectTrigger>
                            <SelectContent>
                                <Suspense key={"departments"} fallback={<div>Loading...</div>}>
                                    {branches.map((branch) => {
                                        return <SelectItem value={branch} key={branch}>{branch}</SelectItem>
                                    })}
                                </Suspense>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="code">Code</Label>
                        <Input type="code" id="code" placeholder="Course Code" variant="fluid" required />
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit">
                    Create Course
                </Button>
            </CardFooter>
        </Card>

    </>
}