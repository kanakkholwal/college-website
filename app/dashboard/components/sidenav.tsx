"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle, ChevronRightCircle, LogOut } from 'lucide-react';
import Link from "next/link";
import React, { useState } from "react";
import { LuBuilding2 } from "react-icons/lu";
import { MdOutlineLibraryBooks } from "react-icons/md";
// import { TbDashboard } from "react-icons/tb";
import { CalendarDays, LayoutGrid } from 'lucide-react';
import { signOut } from "next-auth/react";
import { sessionUserType } from "src/types/session";
    
type LinkType = {
    label: string;
    href: string;
    icon: React.ElementType;
    roles: string[];
}
const links: LinkType[] = [
    {
        label: "Dashboard",
        icon: LayoutGrid,
        href: "/dashboard",
        roles: ["student", "faculty", "admin"],
    },
    {
        label: "Courses",
        icon: MdOutlineLibraryBooks,
        href: "/dashboard/courses",
        roles: ["cr", "faculty"],
    },
    {
        label: "Classrooms",
        icon: LuBuilding2,
        href: "/dashboard/classrooms",
        roles: ["cr", "faculty","admin"],
    },
    {
        label: "Time Tables",
        icon: CalendarDays,
        href: "/dashboard/time-tables",
        roles: ["cr", "faculty","admin"],
    }
];

export default function SideBar({user}:{
    user:sessionUserType
}) {
    const [open, setOpen] = useState(false);
    return (<div
        aria-label="SideBar"
        className={"fixed top-0 left-0 bottom-0 z-[999] flex flex-col w-64 min-h-screen px-4 py-8 rounded-r-[30px] bg-white  dark:bg-slate-800" + (open ? " translate-x-0" : " -translate-x-full lg:translate-x-0") + " transition-transform duration-200 ease-in-out shadow-lg"}
    >
        <button
            className={"absolute top-10 -right-6 p-2 rounded-xl bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 shadow-md transition-colors duration-200 ease-in-out" + (open ? " translate-x-0" : " translate-x-full") + " lg:translate-x-0 lg:hidden"}
            onClick={() => {
                setOpen(!open)
            }}>
            {open ? <ChevronLeftCircle className="w-4 h-4" /> : <ChevronRightCircle className="w-4 h-4" />}
        </button>
        <div className="relative  flex w-full justify-center items-center">
            <Link href="/" aria-label="logo" className="flex items-center space-x-2 uppercase font-bold tracking-wider text-xl text-slate-800 dark:text-slate-200">
                NITH Portal
            </Link>
        </div>
        <nav className="flex flex-col justify-start items-start gap-2 flex-1 mt-6">
            {links.map((link: LinkType) => {
                if (!link.roles.find(role => user.roles.includes(role))) return null;

                return (
                    <Link href={link.href} key={link.href}
                        aria-label={link.label}
                        className="flex items-center gap-2 px-4 py-2 h-10 w-full text-sm text-slate-600 hover:text-primary/80 dark:text-slate-400 group rounded-md transition-colors duration-200 ease-in-out"
                    >
                        <span className="h-3 w-[2px] bg-transparent group-hover:bg-primary/50" />
                        <link.icon className="w-5 h-5" />
                        <span className="font-medium">{link.label}</span>

                    </Link>
                );
            })}
        </nav>
        <div className="">
            <Button variant="destructive" size="lg" className='rounded-full px-6 w-full' onClick={() =>{
                signOut()
            }}>
                Log Out
                <LogOut className="w-4 h-4 ml-2" />
            </Button>
        </div>

    </div>)
}