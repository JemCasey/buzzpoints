"use client";

import { QuestionSet, Tournament } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation"

type NavbarProps = {
    tournament?: Tournament;
    questionSet?: QuestionSet;
}

export default function Navbar({ tournament, questionSet }: NavbarProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    let mainButton = <Link className="text-white font-bold" href={"/"}>Buzzpoints</Link>;
    let menuItems: any[] = [];
    const pageType = tournament ? "tournament" : "set";
    const entity = (tournament || questionSet) as Tournament | QuestionSet | undefined;

    if (entity) {
        menuItems.push(...[
            { label: "Tossups", url: `/${pageType}/${entity.slug}/tossup` },
            { label: "Bonuses", url: `/${pageType}/${entity.slug}/bonus` },
            { label: "Players", url: `/${pageType}/${entity.slug}/player` },
            { label: "Teams", url: `/${pageType}/${entity.slug}/team` },
            { label: "Categories (Tossup)", url: `/${pageType}/${entity.slug}/category-tossup` },
            { label: "Categories (Bonus)", url: `/${pageType}/${entity.slug}/category-bonus` }
        ]);
        mainButton = <Link className="text-white font-bold" href={`/${pageType}/${entity.slug}`}>{entity.name}</Link>
    }

    return <nav className="bg-gray-500 sticky">
        <div className="min-w-screen mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        {mainButton}
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {menuItems.map(({ url, label }, i) => (
                                <Link
                                    key={i}
                                    className={`text-gray-300 hover:text-white px-2 py-2 rounded-md text-sm font-medium${pathname.includes(url) ? " text-white" : ""}`}
                                    href={url}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                    </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false"
                    >
                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        {menuOpen && <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 sm:px-3">
                {menuItems.map(({ url, label }, i) => (
                    <Link key={i} className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium" href={url}>{label}</Link>
                ))}
            </div>
        </div>}
    </nav>;
}
