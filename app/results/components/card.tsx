import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ResultType } from "src/models/result";

export function ResultCard({ result, ...props }: { result: ResultType } & React.ComponentProps<typeof Card>) {


    return <Card  className="hover:shadow-lg animate-in popup " {...props}>
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
            {result.semesters?.at(-1)?.cgpi ?? ''}
        </Button>
        <Button size="sm" variant="default_light" asChild>
            <Link href={`/results/${result.rollNo}`}>
                View Result
            </Link>
        </Button>
    </CardFooter>
</Card>
}

export function SkeletonCard(){

    return <Card className="hover:shadow-lg">
    <CardHeader className="flex-row gap-2 items-center">
        <Skeleton className="w-16 h-16 rounded-full" /> {/* Skeleton for College Rank */}
        <div>
            <Skeleton className="w-40 h-6 mb-2" /> {/* Skeleton for Name */}
            <Skeleton className="w-20 h-4" /> {/* Skeleton for Roll Number */}
        </div>
    </CardHeader>
    <CardContent className="flex justify-around items-stretch gap-3 text-center">
        <div>
            <Skeleton className="w-20 h-4 mb-1" /> {/* Skeleton for Batch Label */}
            <Skeleton className="w-20 h-6" /> {/* Skeleton for Batch Value */}
        </div>
        <div>
            <Skeleton className="w-20 h-4 mb-1" /> {/* Skeleton for Branch Label */}
            <Skeleton className="w-20 h-6" /> {/* Skeleton for Branch Value */}
        </div>
        <div>
            <Skeleton className="w-20 h-4 mb-1" /> {/* Skeleton for Class Label */}
            <Skeleton className="w-20 h-6" /> {/* Skeleton for Class Value */}
        </div>
    </CardContent>
    <CardFooter className="justify-between">
        <Skeleton className="w-16 h-6" /> {/* Skeleton for CGPI */}
        <Skeleton className="w-24 h-8 ml-2" /> {/* Skeleton for View Result Button */}
    </CardFooter>
</Card>

}