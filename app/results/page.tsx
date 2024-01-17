import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Search } from 'lucide-react';
import Link from "next/link";
import { Suspense } from "react";
import { IoMdOptions } from "react-icons/io";
import dbConnect from "src/lib/dbConnect";
import ResultModel from "src/models/result";


export default async function ResultsPage() {
    await dbConnect();
    const results = await ResultModel.find({}).sort({ "rank.college": 1 }).limit(30);


    return (<>
        <div className="relative" id="home">
            <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
            </div>
            <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                <div className="relative pt-36 ml-auto">
                    <div className="lg:w-3/4 text-center mx-auto">
                        <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
                            NITH <span className="relative bg-gradient-to-r from-primary to-violet-200 bg-clip-text text-transparent dark:from-primaryLight dark:to-secondaryLight md:px-2">Result</span>Portal</h1>
                        <p className="mt-8 text-gray-700 dark:text-gray-300 text-center mx-auto">
                            NITH Portal is a platform for students of NITH to get all the resources at one place.
                        </p>
                        <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                            <div className="relative flex items-stretch w-full rounded-full">
                                <div className="absolute top-0 bottom-0 left-0">

                                    <button className="relative flex h-12 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
                                        <span className="relative text-base font-semibold text-primary dark:text-white">
                                            <IoMdOptions className="w-5 h-5" />
                                        </span>
                                    </button>
                                </div>
                                <Input placeholder="Search by Roll No. or Name " className="w-full rounded-full px-20 border border-border h-12 " />
                                <div className="absolute top-0 bottom-0 right-0">

                                    <button className="relative flex h-12 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
                                        <span className="relative text-base font-semibold text-white">
                                            <Search className="w-5 h-5" />
                                        </span>
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 xl:px-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Suspense fallback={<div>Loading...</div>}>
                {results.map((result, i) => {
                    return <Card key={i} className="hover:shadow-lg">
                        <CardHeader className="flex-row gap-2 items-center">
                            <div className="flex justify-center items-center w-16 h-16 rounded-full bg-slate-100 dark:bg-gray-800 font-bold text-xl">
                                {result.rank.college}
                            </div>
                            <div>
                                <CardTitle>{result.name}</CardTitle>
                                <CardDescription className="font-semibold">{result.rollNo}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="flex justify-around items-stretch gap-3 text-center">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Batch</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.rank.batch}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Branch</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.rank.branch}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Class</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.rank.class}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-between">
                            <Button size="sm">
                                {result.semesters.at(-1).cgpi}

                            </Button>
                            <Button size="sm" variant="default_light" asChild>
                                <Link href={`/results/${result.rollNo}`}>
                                    View Result
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                })}
            </Suspense>
        </div>
    </>)
}
