import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { BadgePlus, Search, User } from 'lucide-react';
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { Suspense } from "react";
import dbConnect from "src/lib/dbConnect";
import CourseModel from "src/models/course";
import { sessionType } from "src/types/session";



export default async function DashboardPage() {
    const session = await getServerSession(authOptions) as sessionType;

    await dbConnect();
    const coursesCount = await CourseModel.countDocuments({}).exec();

    return (<div className="space-y-6 my-5">
        <h2 className="text-3xl font-semibold">
            Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4 items-stretch w-full">
            <Link href={"/people/" + session.user.rollNo} target="_blank" className="grow hover:shadow-sm bg-white dark:bg-slate-800 rounded-xl py-3 px-5 space-x-2 flex items-center">
                <div className="flex items-center justify-center rounded-full p-3 w-16 h-16 bg-sky-500">
                    <User className="w-10 h-10 text-slate-100 dark:text-slate-200" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold">@{session.user.rollNo}</h1>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                        Check out your profile
                    </p>
                </div>
            </Link>
            <Link href={"/toolzen/browse"} target="_blank" className="grow hover:shadow-sm bg-white dark:bg-slate-800 rounded-xl py-3 px-5 space-x-2 flex items-center">
                <div className="flex items-center justify-center rounded-full p-3 w-16 h-16 bg-sky-500">
                    <Search className="w-10 h-10 text-slate-100 dark:text-slate-200" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold">
                        Browse Results
                    </h1>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                        Browse through the results
                    </p>
                </div>
            </Link>
            <Link href={"/admin/courses/new"} className="grow hover:shadow-sm bg-white dark:bg-slate-800 rounded-xl py-3 px-5 space-x-2 flex items-center">
                <div className="flex items-center justify-center rounded-full p-3 w-16 h-16 bg-sky-500">
                    <BadgePlus className="w-10 h-10 text-slate-100 dark:text-slate-200" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold">
                        Create Course
                    </h1>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                        Create a new course
                    </p>
                </div>
            </Link>
        </div>
        <div className="mx-auto px-6 md:px-12 xl:px-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card className="hover:shadow-lg animate-in popup ">
                <CardHeader className="flex-row items-center gap-2">
                    <div className="flex justify-center items-center w-16 h-16 rounded-full bg-slate-100 dark:bg-gray-800 font-bold text-xl">
                        <Suspense fallback={<div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-gray-800 animate-pulse" />}>
                            {coursesCount.toString()}
                        </Suspense>
                    </div>
                    <div>
                        <CardTitle>
                            Courses
                        </CardTitle>
                        <CardDescription>
                            Total Courses in the database
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardFooter className="flex justify-around items-stretch gap-3 text-center">
                    <Button asChild>
                        <Link href={"/admin/courses"} className="w-full">
                            Edit Courses
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>


    </div>)
}