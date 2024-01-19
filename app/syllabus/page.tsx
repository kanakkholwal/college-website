import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { getCourses } from "./actions";
import Pagination from "./components/pagination";
import SearchBox from "./components/search";

export default async function CoursesPage({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        page?: string,
        department?: string,
        type?: string,

    };
}) {

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const filter = {
        department: searchParams?.department || '',
        type: searchParams?.type || ''
    }
    const { courses, departments, types, totalPages } = await getCourses(query, currentPage, filter);
    console.log(courses, departments, types);


    return <>
        <div className="relative mb-28" id="home">
            <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
            </div>
            <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                <div className="relative pt-36 ml-auto">
                    <div className="lg:w-3/4 text-center mx-auto">
                        <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
                            Courses <span className="text-primary">Search</span>
                        </h1>

                        <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                            <Suspense fallback={<>
                                <Skeleton className="h-12 w-full " />
                            </>}>

                                <SearchBox departments={departments} types={types} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
            {courses.length > 0 ? <Pagination totalPages={totalPages} />:null}
            
        </div>
    </>
}