"use client"
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { prevPaperType } from "src/models/course";
import { addPrevPaper } from "./actions";


const yearOptions: string[] = Array.from(
    { length: 6 },
    (_, index) => (new Date().getFullYear() - index).toString()
) as string[];

const formSchema = z.object({
    exam: z.enum(['midsem', 'endsem', 'others']),
    link: z.string(),
    year: z.enum([...yearOptions]),
});



export function AddPrevsModal({ code }: {
    code: string,
}) {

    const form = useForm<prevPaperType>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: prevPaperType) => {
        // Handle form submission
        console.log(data);
        await addPrevPaper(code,data.year,data.exam,data.link).then((data)=>{
            console.log(data)
        }).catch((err)=>{
            console.log(err);
        })
    };

    return <Dialog>
        <DialogTrigger asChild>
            <Button>
                Add Previous Paper
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Add Previous Paper for {code}
                </DialogTitle>
                <DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

                            <FormField
                                control={form.control}
                                name="year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Year" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {yearOptions.map((year) => (
                                                        <SelectItem key={year} value={year}>
                                                            {year}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>This is the name of the paper.(drive link with public access)</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Link</FormLabel>
                                        <FormControl>
                                            <Input variant="fluid" type="url" placeholder="Enter Link" {...field} />
                                        </FormControl>
                                        <FormDescription>This is the link to the paper.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="exam"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Exam Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Exam Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="midsem">Midterm Exam</SelectItem>
                                                <SelectItem value="endsem">End Semester Exam</SelectItem>
                                                <SelectItem value="others">Others</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>This is the type of exam.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <Button type="submit" className="w-full" size="lg">Submit</Button>
                        </form>
                    </Form>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>

}

export function AddRefs() {

    return <Dialog>
        <DialogTrigger asChild>
            <Button>
                Add new reference
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>

}