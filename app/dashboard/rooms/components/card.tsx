import { formatDistanceToNow, parseISO } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {RoomTypeWithId} from "src/models/room";

import {  updateStatus } from "src/lib/room/actions";

import Toggle from "./toggle";

// Function to convert a date string to local time string + time ago format
function formatDateAgo(dateString: string): string {
  const date = parseISO(dateString);
  const localTimeString = date.toLocaleString(); // Convert to local time string
  const timeAgo = formatDistanceToNow(date, { addSuffix: true }); // Calculate time ago

  return `${localTimeString} (${timeAgo})`;
}

export function RoomCardCr({ room }: { room:RoomTypeWithId  }) {

    return <Card  className="hover:shadow-lg">
    <CardHeader>
        <CardTitle>
            {room.roomNumber}
        </CardTitle>
        <CardDescription>
            Last updated: {formatDateAgo(room.lastUpdatedTime.toString())}
        </CardDescription>
    </CardHeader>
    <CardContent>
        <div className="flex w-full flex-col md:flex-row md:justify-around gap-2">
            <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-semibold text-slate-600">Capacity</span>
                <Badge className="uppercase" variant="default_light">{room.capacity}</Badge>
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-semibold text-slate-600">Room Type</span>
                <Badge className="uppercase" variant="ghost">{room.roomType}</Badge>
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-semibold text-slate-600">Current Status</span>
                <Badge className="uppercase"
                variant={room.currentStatus === "available" ? "success" : "destructive"}
                >{room.currentStatus}</Badge>
            </div>
        </div>
    </CardContent>
    <CardFooter>
        <Toggle roomNumber={room.roomNumber} currentStatus={room.currentStatus}
            updateStatus={updateStatus}
        />
    </CardFooter>
</Card>
}
export function RoomCardPublic({ room }: { room:RoomTypeWithId  }) {
    return <Card  className="hover:shadow-lg">
    <CardHeader>
        <CardTitle>
            {room.roomNumber}
        </CardTitle>
        <CardDescription>
        Last updated: {formatDateAgo(room.lastUpdatedTime.toString())}
        </CardDescription>
    </CardHeader>
    <CardContent>
        <div className="flex w-full flex-col md:flex-row md:justify-around gap-2">
            <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-semibold text-slate-600">Capacity</span>
                <Badge className="uppercase" variant="default_light">{room.capacity}</Badge>
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-semibold text-slate-600">Room Type</span>
                <Badge className="uppercase" variant="ghost">{room.roomType}</Badge>
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-semibold text-slate-600">Current Status</span>
                <Badge className="uppercase"
                variant={room.currentStatus === "available" ? "success" : "destructive"}
                >{room.currentStatus}</Badge>
            </div>
        </div>
    </CardContent>

</Card>
}