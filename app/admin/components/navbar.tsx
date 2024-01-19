"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { VscChevronDown } from "react-icons/vsc";
import { sessionUserType } from "src/types/session";
import ThemeSwitcher from "./theme-switcher";

export default function Navbar({ user }: { user: sessionUserType }) {

    return (<nav className="w-full p-4 rounded-[20px] bg-white dark:bg-slate-800 flex items-center lg:px-6">
        <div className="flex items-start flex-col pl-12 lg:pl-0">
            <h3 className="text-lg font-bold">Admin Dashboard</h3>
            <h6 className="text-sm text-gray-500 dark:text-slate-400">
                Hello {user.firstName}, Welcome back!
            </h6>
        </div>
        <div className="ml-auto inline-flex gap-1 items-center">

            <ThemeSwitcher />
     
        </div>
    </nav>)
}