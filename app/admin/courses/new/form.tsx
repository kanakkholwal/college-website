
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    CardContent
} from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
export default function NewCourseForm(){

    return   <CardContent>

        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Course Name" />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="code">Code</Label>
                <Input id="code" name="code" placeholder="Course Code" />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="credits">Credits</Label>
                <Input id="credits" name="credits" placeholder="Credits" />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" name="department" placeholder="Department" />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="type">Type</Label>
                <Select name="type">
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="core">Core</SelectItem>
                        <SelectItem value="elective">Elective</SelectItem>
                        <SelectItem value="lab">Lab</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="content">Content</Label>
                <Input id="content" name="content" placeholder="Content" />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="prerequisites">Prerequisites</Label>
                <Input id="prerequisites" name="prerequisites" placeholder="Prerequisites" />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="books_and_references">Books and References</Label>
                <Input id="books_and_references" name="books_and_references" placeholder="Books and References" />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="prev_papers">Previous Papers</Label>
                <Input id="prev_papers" name="prev_papers" placeholder="Previous Papers" />
            </div>
        </div>
</CardContent>
}