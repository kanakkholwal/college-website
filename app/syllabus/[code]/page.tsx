import { notFound } from "next/navigation";
// import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';
import OthersPng from "./assets/others.png";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { Undo2 } from 'lucide-react';
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { getCourseByCode } from "src/lib/course/actions";
import dbConnect from "src/lib/dbConnect";
import CourseModel, { booksAndRefType, prevPaperType } from "src/models/course";
import { AddPrevsModal, AddRefsModal } from "./modal";
import { IconMap } from "./render-link";

export default async function CoursePage({ params }: { params: { code: string } }) {
    const session = await getServerSession(authOptions);

    await dbConnect();
    const course = await getCourseByCode(params.code)
    if (!course) {
        return notFound()
    }
    console.log(course);

    async function addPrevPaper(paper: prevPaperType): Promise<boolean> {
        "use server";
        await dbConnect();
        const course = await CourseModel.findOne({ code: params.code });
        if (!course) return Promise.reject("Course not found");
        if (course.prev_papers.find((p: prevPaperType) => p.link === paper.link)) {
            return Promise.reject("Paper already exists");
        }
        course.prev_papers.push(paper);
        await course.save();
        revalidatePath(`/syllabus/${course.code}`);
        return Promise.resolve(true);
    }
    async function addReference(ref: booksAndRefType): Promise<boolean> {
        "use server";
        await dbConnect();
        const course = await CourseModel.findOne({ code: params.code });
        if (!course) return Promise.reject("Course not found");
        if (course.books_and_references.find((p: booksAndRefType) => p.link === ref.link)) {
            return Promise.reject("Reference already exists");
        }
        course.books_and_references.push(ref);
        await course.save();
        revalidatePath(`/syllabus/${course.code}`);
        return Promise.resolve(true);
    }


    return <>
        <div className="relative mb-24" id="home">
            <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
            </div>
            <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                <div className="relative pt-24 ml-auto">
                    <Link href="/syllabus" className="relative flex h-12 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
                        <span className="relative text-base font-semibold text-primary dark:text-white flex items-center gap-2">
                            <Undo2 className="w-5 h-5" />
                            Go Back
                        </span>
                    </Link>
                    <div className="lg:w-3/4 text-center mx-auto mt-10">
                        <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
                            <span className="relative bg-gradient-to-r from-primary to-violet-200 bg-clip-text text-transparent dark:from-primaryLight dark:to-secondaryLight md:px-2">
                                {course.name}
                            </span>
                        </h1>
                        <h5 className="mt-8 text-xl font-semibold text-gray-700 dark:text-gray-300 text-center mx-auto uppercase">
                            {course.code}

                        </h5>
                        <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                            <div className="w-full flex flex-wrap items-center gap-4 text-sm mx-auto justify-center">



                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-12 xl:px-6">
            <Tabs defaultValue="chapters">
                <TabsList className="mx-auto w-full bg-transparent font-bold flex-wrap gap-4">
                    <TabsTrigger value="chapters">Chapters</TabsTrigger>
                    <TabsTrigger value="books_and_references">Books and References</TabsTrigger>
                    <TabsTrigger value="prev_papers">Previous Year Papers</TabsTrigger>
                </TabsList>
                <TabsContent value="chapters">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {course.chapters.map((chapter, index) => {
                            return <Card key={index}>
                                <CardHeader className="gap-2 md:flex-row flex-wrap md:items-center md:justify-between w-full">
                                    <div>
                                        <CardTitle>{chapter.title}</CardTitle>
                                        <CardDescription>
                                            {chapter.topics.length} Topics
                                        </CardDescription>
                                    </div>
                                    <div className="w-10 h-10 rounded-full flex justify-center items-center  bg-slate-100 dark:bg-gray-800 font-bold text-lg">
                                        {chapter.lectures} L
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {chapter.topics.join(", ")}
                                    </p>
                                </CardContent>
                            </Card>
                        })}
                    </div>
                </TabsContent>
                <TabsContent value="books_and_references">
                    {course.books_and_references.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {course.books_and_references.map((ref: booksAndRefType, index: number) => {
                            const iconsSrc = IconMap.has(ref.type as booksAndRefType["type"]) ? IconMap.get(ref.type as booksAndRefType["type"]) : OthersPng;
                            return <Card key={index}>
                                <CardHeader className="md:flex-row md:justify-between gap-2">
                                    <div className="w-16 h-16 p-3 aspect-square rounded-full flex justify-center items-center  bg-slate-100 dark:bg-gray-800 font-bold text-lg">
                                        {iconsSrc ? <Image src={iconsSrc} className="w-10 h-10" width={40} height={40} alt={ref.link} /> : <Image src={OthersPng} className="w-10 h-10" width={40} height={40} alt={ref.link} />}
                                    </div>
                                    <div className="flex-auto grow">
                                        <CardTitle className="break-words">{ref.name}</CardTitle>
                                        <a href={ref.link} target="_blank" className="text-primary mt-2 text-sm font-semibold" >
                                            Go to Link
                                        </a>
                                    </div>

                                </CardHeader>

                            </Card>
                        })}

                    </div> : <p className="text-center text-gray-600 dark:text-gray-400 text-md font-semibold pt-5">
                        Any Books and References will be shown here.
                    </p>}
                    <div className="flex w-full items-center justify-center p-4">
                        {session?.user ? <AddRefsModal code={course.code} addReference={addReference} />:<p className="text-center text-gray-600 dark:text-gray-400 text-md font-semibold pt-5">
                            <Link href="/login" className="text-primary font-semibold hover:underline">
                                Login

                            </Link> to add Books and References
                        </p>}

                    </div>

                </TabsContent>
                <TabsContent value="prev_papers">

                    {course.prev_papers.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {course.prev_papers.map((paper, index) => {
                            return <div className="flex items-center p-4 gap-3 border border-border hover:border-primary rounded-md" key={index}>
                                <h6 className="uppercase font-semibold text-lg">
                                    {paper.exam}
                                </h6>
                                <Badge className="bg-primary ml-2">{paper.year}</Badge>
                                <div className="ml-auto">
                                    <Button size="icon" asChild>
                                        <a href={paper.link} target="_blank" >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        })}
                    </div> : <p className="text-center text-gray-600 dark:text-gray-400 text-md font-semibold pt-5">
                        Any Previous Year Papers will be shown here.
                    </p>}

                    <div className="flex w-full items-center justify-center p-4">
                        {session?.user ? <AddPrevsModal code={course.code} addPrevPaper={addPrevPaper} /> : <p className="text-center text-gray-600 dark:text-gray-400 text-md font-semibold pt-5">
                            <Link href="/login" className="text-primary font-semibold hover:underline">
                                Login

                            </Link> to add Previous Year Papers</p>}
                    </div>
                </TabsContent>
            </Tabs>

        </div>

    </>
}