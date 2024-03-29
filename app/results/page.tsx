
import { Suspense } from "react";
import { getResults } from "./action";
import { ResultCard, SkeletonCard } from "./components/card";
import Pagination from "./components/pagination";
import SearchBox from "./components/search";

import { Skeleton } from "@/components/ui/skeleton";


export default async function ResultPage({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        page?: string,
        batch?: string,
        branch?: string,
        programme?: string,

    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const filter = {
        batch:Number(searchParams?.batch),
        branch: searchParams?.branch || '',
        programme: searchParams?.programme || ''
    }

    const { results, totalPages, branches, programmes, batches } = await getResults(query, currentPage, filter);


    return (<>
        <div className="relative mb-28" id="home">
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
                            <Suspense  key={"key_search_bar"} fallback={<Skeleton className="h-12 w-full " />}>
                                <SearchBox branches={branches} programmes={programmes} batches={batches} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 xl:px-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Suspense  key={"results_key"} fallback={<>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </>}>
                {results.map((result, i) => {
                    return <ResultCard key={i} result={result} style={{
                        animationDelay: `${i * 100}ms`
                    }} />
                })}
            </Suspense>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
            <Suspense  key={"Pagination_key"} fallback={<>
                <Skeleton className="h-12 w-full " />
            </>}>

                <Pagination totalPages={totalPages} />
            </Suspense>
        </div>
    </>)
}
