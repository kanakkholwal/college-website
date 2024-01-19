import { Mail, Undo2 } from 'lucide-react';
import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "src/lib/dbConnect";
import ResultModel, { Semester } from "src/models/result";
import { CgpiCard, RankCard, SemCard } from "./components/card";
// import SemesterCGPIChart from "./components/chart";


export default async function ResultsPage({ params }: { params: { rollNo: string } }) {
    await dbConnect();
    const result = await ResultModel.findOne({
        rollNo: params.rollNo
    });
    if (!result) {
        return notFound()
    }


    return (<>
        <div className="relative mb-24" id="home">
            <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
            </div>
            <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                <div className="relative pt-24 ml-auto">
                    <Link href="/results" className="relative flex h-12 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
                        <span className="relative text-base font-semibold text-primary dark:text-white flex items-center gap-2">
                            <Undo2 className="w-5 h-5" />
                            Go Back
                        </span>
                    </Link>
                    <div className="lg:w-3/4 text-center mx-auto mt-10">
                        <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
                            <span className="relative bg-gradient-to-r from-primary to-violet-200 bg-clip-text text-transparent dark:from-primaryLight dark:to-secondaryLight md:px-2">
                                {result.name}
                            </span>
                        </h1>
                        <h5 className="mt-8 text-xl font-semibold text-gray-700 dark:text-gray-300 text-center mx-auto uppercase">
                            {result.rollNo}
                            <Link href={`mailto:${result.rollNo}@nith.ac.in`} className="inline-block text-primary hover:text-primaryLight ease-in duration-300 align-middle ml-2 -mt-1" title={"Contact via mail"}>
                                <Mail className="w-5 h-5" />
                            </Link>
                        </h5>
                        <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                            <div className="w-full flex flex-wrap items-center gap-4 text-sm mx-auto justify-center">
                                <span className={"bg-primary/10 text-primary py-1.5 px-3 rounded-md"}>
                                    {getYear(result.semesters)}
                                </span>
                                <span className={"bg-primary/10 text-primary py-1.5 px-3 rounded-md"}>
                                    {result.branch}
                                </span>
                                <span className={"bg-primary/10 text-primary py-1.5 px-3 rounded-md"}>
                                    {result.programme}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-12 xl:px-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <RankCard result={result} />
            <CgpiCard result={result} />
        </div>
        <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mx-auto mt-24 mb-10">
                Semester Wise Results
            </h2>
            <div className="max-w-6xl mx-auto px-6 md:px-12 xl:px-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {result.semesters?.map((semester: Semester, index: number) => {
                    return <SemCard key={index} semester={semester} />
                })}
            </div>
            {/* <Suspense fallback={<div style={{ height: 350, position: 'relative' }}>
                <Skeleton className="w-full h-full" />
            </div>}>
                {result.semesters && <SemesterCGPIChart semesters={result.semesters} />}

            </Suspense> */}

        </div>
    </>)
}

function getYear(semesters: any[]): string | null {

    if (semesters.length === 1 || semesters.length === 2) return "First Year"
    else if (semesters.length === 3 || semesters.length === 4) return "Second Year"
    else if (semesters.length === 5 || semesters.length === 6) return "Third Year"
    else if (semesters.length === 7 || semesters.length === 8) return "Final Year"
    else if (semesters.length === 9 || semesters.length === 10) return "Super Final Year"
    else
        return null

}