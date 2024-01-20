
"use client";
import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MinusCircle, Plus, Send } from 'lucide-react';
import { ChapterType, CourseType } from "src/models/course";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useNewCourseForm } from "./store";



export default function NewCourseForm() {
    const { name, code, credits, department, type, chapters, books_and_references, prev_papers, addChapter, removeChapter, setName, setCode, setCredits, setDepartment, setType, addReference, removeReference, addPrevPaper, removePrevPaper } = useNewCourseForm();

    return<> <CardContent className="space-y-4">
        <div className="grid gap-4 w-full grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Course Name" variant="fluid"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="code">Code</Label>
                <Input id="code" name="code" placeholder="Course Code" variant="fluid"
                    value={code}
                    onChange={(e) => setCode(e.currentTarget.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="credits">Credits</Label>
                <Input id="credits" name="credits" placeholder="Credits" variant="fluid"
                    value={credits}
                    onChange={(e) => setCredits(parseInt(e.currentTarget.value))}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" name="department" placeholder="Department" variant="fluid"
                    value={department}
                    onChange={(e) => setDepartment(e.currentTarget.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="type">Type</Label>
                <Select name="type"
                    value={type}
                    onValueChange={(value) => setType(value as CourseType["type"])}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="core">Core</SelectItem>
                        <SelectItem value="elective">Elective</SelectItem>
                        <SelectItem value="lab">Lab</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="flex flex-col gap-2 ">
            <div className="grid gap-4 w-full">
                <Label htmlFor="content">Chapters</Label>
                {chapters.map((chapter: ChapterType, index) => {
                    return <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <Input id={`chapter-${index}-name`} name={`chapter-${index}-name`} placeholder="Chapter Name" variant="fluid" value={chapter.title} onChange={(e) => addChapter({ ...chapter, title: e.currentTarget.value })} />
                            <Input id={`chapter-${index}-lectures`} name={`chapter-${index}-lectures`} placeholder="Lectures" variant="fluid" value={chapter.lectures} onChange={(e) => addChapter({ ...chapter, lectures: parseInt(e.currentTarget.value) })} />
                            <Button size="icon" variant="destructive_light" onClick={() => removeChapter(index)}>
                                <MinusCircle className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                })}
                <Button onClick={() => addChapter({
                    title: "",
                    lectures: 0,
                    topics: [],
                })} className="max-w-md mx-auto">
                    <Plus className="w-4 h-4 mr-2" /> Add Chapter</Button>

            </div>
            <div className="grid gap-4 w-full">
                <Label htmlFor="content">Books and References</Label>

            </div>
        </div>
    </CardContent>
    <CardFooter>
                <Button type="submit">
                    <Send className="mr-2 h-5 w-5" />
                    Create Course
                </Button>
            </CardFooter>
    </>
}