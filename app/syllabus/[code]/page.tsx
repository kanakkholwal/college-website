import { notFound } from "next/navigation";
// import { Suspense } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Undo2 } from 'lucide-react';
import Link from "next/link";
import { getCourseByCode } from "src/lib/course/actions";
import dbConnect from "src/lib/dbConnect";


export default async function CoursePage({ params }: { params: { code: string } }) {
    await dbConnect();
    const course = await getCourseByCode(params.code)
    if (!course) {
        return notFound()
    }
    console.log(course)

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
                                {/* <span className={"bg-primary/10 text-primary py-1.5 px-3 rounded-md"}>
                                    {getYear(result.semesters)}
                                </span>
                                <span className={"bg-primary/10 text-primary py-1.5 px-3 rounded-md"}>
                                    {result.branch}
                                </span>
                                <span className={"bg-primary/10 text-primary py-1.5 px-3 rounded-md"}>
                                    {result.programme}
                                </span> */}

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-12 xl:px-6">
            <Tabs defaultValue="chapters">
                <TabsList  className="mx-auto w-full bg-transparent font-bold">
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
                    Any Books and References will be shown here.
                </TabsContent>
                <TabsContent value="prev_papers">
                    Any Previous Year Papers will be shown here.
                </TabsContent>
            </Tabs>

        </div>

    </>
}