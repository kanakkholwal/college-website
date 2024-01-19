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
import { CourseType } from "src/models/course";

export function CourseCard({ course, ...props }: { course: CourseType } & React.ComponentProps<typeof Card>) {


    return <Card  className="hover:shadow-lg animate-in popup " {...props}>
    <CardHeader>
    
            <CardTitle>
                {course.name}
                </CardTitle>
            <CardDescription className="font-semibold">
                {course.code}
                </CardDescription>
    </CardHeader>

    <CardFooter className="justify-between gap-2">
        <Button size="sm" variant="ghost">
            {course.type} 
        </Button>
        <Button size="sm" variant="default_light">
            {course.credits} Credits
        </Button>
        <Button size="sm" variant="default" asChild>
            <Link href={`/courses/${course.id}`}>
                View Course
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