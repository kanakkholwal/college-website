"use client";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function ClassCard() {

    return <Card className="hover:shadow-lg">
        <CardHeader>
            <CardTitle>
                Class 1
            </CardTitle>
            <CardDescription>
                Last updated: 2 hours ago
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex w-full flex-col md:flex-row md:justify-around gap-2">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-semibold text-slate-600">Capacity</span>
                    <Badge className="uppercase" variant="default_light">50</Badge>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-semibold text-slate-600">Room Type</span>
                    <Badge className="uppercase" variant="ghost">Lecture</Badge>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-semibold text-slate-600">Current Status</span>
                    <Badge className="uppercase"
                        variant="success"
                    >Available</Badge>
                </div>
            </div>
        </CardContent>
        <CardFooter>

        </CardFooter>
    </Card>
}