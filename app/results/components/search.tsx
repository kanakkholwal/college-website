"use client";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IoMdOptions } from "react-icons/io";
import { useDebouncedCallback } from 'use-debounce';


export default function SearchBox() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        console.log(`Searching... ${term}`);

        console.log(term);
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);

    }, 300);

    return <div className="relative flex items-stretch w-full rounded-full">
        <div className="absolute top-0 bottom-0 left-0">

            <button className="relative flex h-12 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
                <span className="relative text-base font-semibold text-primary dark:text-white">
                    <IoMdOptions className="w-5 h-5" />
                </span>
            </button>
        </div>
        <Input placeholder="Search by Roll No. or Name " className="w-full rounded-full px-20 border border-border h-12 "
            defaultValue={searchParams.get('query')?.toString()}
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
        />
        <div className="absolute top-0 bottom-0 right-0">

            <button className="relative flex h-12 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
                <span className="relative text-base font-semibold text-white">
                    <Search className="w-5 h-5" />
                </span>
            </button>
        </div>

    </div>
}