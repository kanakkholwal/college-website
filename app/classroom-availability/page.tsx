import { Skeleton } from "@/components/ui/skeleton";
import { RoomCardPublic } from "app/dashboard/rooms/components/card";
import Pagination from "app/dashboard/rooms/components/pagination";
import SearchBox from "app/dashboard/rooms/components/search";
import { Suspense } from "react";
import { getRooms } from "src/lib/room/actions";


export default async function RoomsPage({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        page?: string,
        currentStatus?: string,
        roomType?: string,
    };
}) {

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const filter = {
        currentStatus: searchParams?.currentStatus || '',
        roomType: searchParams?.roomType || "",
    }
    const { rooms, totalPages, currentStatuses, roomTypes } = await getRooms(query, currentPage, filter);

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
                            Rooms <span className="text-primary">Search</span>
                        </h1>

                        <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                            <Suspense key="SearchBox" fallback={<>
                                <Skeleton className="h-12 w-full " />
                            </>}>

                                <SearchBox statuses={currentStatuses} types={roomTypes} />
                            </Suspense>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 xl:px-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            <Suspense key="Rooms" fallback={<>
                <Skeleton className="h-12 w-full " />
                <Skeleton className="h-12 w-full " />
                <Skeleton className="h-12 w-full " />
            </>}>
                {rooms.map((room) => {
                    return <RoomCardPublic key={room._id.toString()} room={room}/>
                })}
            </Suspense>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 mt-5">
            <Suspense key="Pagination" fallback={<>
                <Skeleton className="h-12 w-full " />
            </>}>
                {rooms.length > 0 ? <Pagination totalPages={totalPages} /> : null}
            </Suspense>

        </div>

    </>
}