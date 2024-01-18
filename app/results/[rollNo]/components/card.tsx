
import { Course, Semester } from "src/models/result";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { ArrowDownUp, TrendingUp } from 'lucide-react';
import { ResultType } from "src/models/result";


export function CgpiCard({ result }: {
    result: ResultType
}) {
    const maxCgpi = result.semesters?.reduce((prev, curr) => Math.max(prev, curr.cgpi), 0);
    const minCgpi = result.semesters?.reduce((prev, curr) => Math.min(prev, curr.cgpi), 10);
    const cgpi = result.semesters?.at(-1)?.cgpi ?? 0;
    return <Card className="hover:shadow-lg animate-in popup ">
        <CardHeader className="flex-row items-center gap-2">
            <div className="flex justify-center items-center w-16 h-16 rounded-full bg-slate-100 dark:bg-gray-800 font-bold text-xl">
                <TrendingUp />
            </div>
            <div>
                <CardTitle>
                    CGPI
                </CardTitle>
                <CardDescription>
                    Trend Analysis
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent className="flex justify-around items-stretch gap-3 text-center">
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400"> Max CGPI</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white"> {maxCgpi} </p>
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">CGPI</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{cgpi}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400"> Min CGPI</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{minCgpi}</p>
            </div>
        </CardContent>
    </Card>

}
export function RankCard({ result }: {
    result: ResultType
}) {

    return <Card className="hover:shadow-lg animate-in popup ">
        <CardHeader className="flex-row items-center gap-2">
            <div className="flex justify-center items-center w-16 h-16 rounded-full bg-slate-100 dark:bg-gray-800 font-bold text-xl">
                <ArrowDownUp />
            </div>
            <div>
                <CardTitle>
                    Ranking
                </CardTitle>
                <CardDescription>
                    Ranking Analysis
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent className="flex justify-around items-stretch gap-3 text-center">
            <div>
                <p className="text-base font-semibold text-gray-500 dark:text-gray-400">College</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">{result.rank.college}</p>
            </div>
            <div>
                <p className="text-base font-semibold text-gray-500 dark:text-gray-400">Batch</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">{result.rank.batch}</p>
            </div>
            <div>
                <p className="text-base font-semibold text-gray-500 dark:text-gray-400">Branch</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">{result.rank.branch}</p>
            </div>
            <div>
                <p className="text-base font-semibold text-gray-500 dark:text-gray-400">Class</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">{result.rank.class}</p>
            </div>
        </CardContent>
    </Card>

}

export function SemCard({ semester }: {
    semester: Semester
}) {
    return <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-sky-300 p-4">
            <div className="flex items-center">
                <h2 className="text-2xl font-bold text-white">
                    Semester {semester.semester}
                </h2>
            </div>
            <p className="text-gray-100 mt-2">{semester.sgpi}</p>
        </div>
        <div className="p-4 flex flex-col">
            {semester.courses?.map((course: Course, index) => {
                return (<div className="flex justify-between items-center py-2 gap-2 border-b border-border last:border-b-0" key={index}>
                    <div className="flex items-start flex-col">
                        <h2 className="text-md tracking-wide font-semibold text-gray-900 dark:text-white">
                            {course.name.replaceAll("&amp;", "&")}
                        </h2>
                        <p className="text-sm text-gray-500">{course.code}</p>
                    </div>
                    <div className="text-primary text-sm bg-primary/20 dark:bg-primary/10 p-3 rounded-full h-6 w-6 flex justify-center items-center">{course.cgpi}</div>
                </div>)
            })}

        </div>
    </div>
}