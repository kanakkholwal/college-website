import { authOptions } from "app/api/auth/[...nextauth]/options";
import { Search, User } from 'lucide-react';
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import dbConnect from "src/lib/dbConnect";

import { sessionType } from "src/types/session";



export default async function DashboardPage() {
    const session = await getServerSession(authOptions) as sessionType;

    await dbConnect();


    return (<div className="space-y-6 my-5">
        <h2 className="text-3xl font-semibold">
            Quick Actions
        </h2>

        <div className="mx-auto px-6 md:px-12 xl:px-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            <Link href={"/results"} target="_blank" className="grow hover:shadow-sm bg-white dark:bg-slate-800 rounded-xl py-3 px-5 space-x-2 flex items-center">
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
            <Link href={"/syllabus"} target="_blank" className="grow hover:shadow-sm bg-white dark:bg-slate-800 rounded-xl py-3 px-5 space-x-2 flex items-center">
                <div className="flex items-center justify-center rounded-full p-3 w-16 h-16 bg-sky-500">
                    <Search className="w-10 h-10 text-slate-100 dark:text-slate-200" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold">
                        Browse Syllabus
                    </h1>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                        Browse through the syllabus & Study Material
                    </p>
                </div>
            </Link>
        </div>


    </div>)
}