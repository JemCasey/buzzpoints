"use client";

import { Bonus, BonusDirect } from "@/types";
import Table from "../Table";
import Link from "next/link";
import { shortenAnswerline } from "@/utils";

type TeamBonusDataProps = {
    bonus: Bonus[];
    mode?: "tournament" | "set";
    slug?: string;
    format?: string;
    bonuses?: boolean;
}

export default function TeamBonusData({ bonus, mode, slug }: TeamBonusDataProps) {
    let difficulties = ["E", "M", "H"];
    const columns = [
        {
            key: "round",
            label: "Round"
        },
        {
            key: "category",
            label: "Category",
            linkTemplate: `/${mode}/${slug}/category-bonus/{{category_slug}}`,
            html: true
        },
        {
            key: "opponent_name",
            label: "Opponent",
            linkTemplate: `/${mode}/${slug}/team/{{opponent_slug}}`,
        },
        {
            key: "easy_part",
            label: "Easy",
            sortKey: "easy_part_sanitized",
            render: (item: Bonus) => (
                <>
                    <Link
                        href={`/tournament/${item.tournament_slug}/bonus/${item.round}/${item.question_number}`}
                        className="underline"
                    >
                        <span dangerouslySetInnerHTML={{ __html: item.easy_part }}></span>
                    </Link>
                    <span className="ms-1 text-xs font-light">{`(${item.easy_part_number})`}</span>
                </>
            )
        },
        {
            key: "easy_conversion",
            label: "",
            render: (b: any) => (
                <>
                    {b.easy_conversion > 0 ? "✓" : "✕"}
                </>
            )
        },
        {
            key: "medium_part",
            label: "Medium",
            sortKey: "medium_part_sanitized",
            render: (item: Bonus) => (
                <>
                    <Link
                        href={`/tournament/${item.tournament_slug}/bonus/${item.round}/${item.question_number}`}
                        className="underline"
                    >
                        <span dangerouslySetInnerHTML={{ __html: item.medium_part }}></span>
                    </Link>
                    <span className="ms-1 text-xs font-light">{`(${item.medium_part_number})`}</span>
                </>
            )
        },
        {
            key: "medium_conversion",
            label: "",
            render: (b: any) => (
                <>
                    {b.medium_conversion > 0 ? "✓" : "✕"}
                </>
            )
        },
        {
            key: "hard_part",
            label: "Hard",
            sortKey: "hard_part_sanitized",
            render: (item: Bonus) => (
                <>
                    <Link
                        href={`/tournament/${item.tournament_slug}/bonus/${item.round}/${item.question_number}`}
                        className="underline"
                    >
                        <span dangerouslySetInnerHTML={{ __html: item.hard_part }}></span>
                    </Link>
                    <span className="ms-1 text-xs font-light">{`(${item.hard_part_number})`}</span>
                </>
            )
        },
        {
            key: "hard_conversion",
            label: "",
            render: (b: any) => (
                <>
                    {b.hard_conversion > 0 ? "✓" : "✕"}
                </>
            )
        },
        {
            key: "total",
            label: "Total",
        },
        {
            key: "parts",
            label: "Parts",
            render: (bonus: Bonus) => (
                <>
                    {`${[
                        bonus.easy_conversion === 10,
                        bonus.medium_conversion === 10,
                        bonus.hard_conversion === 10
                    ].flatMap((bool, index) => bool ? index : []).map(index => difficulties[index]).join("") || ""
                    }`}
                </>
            )
        }
    ];

    return (
        <Table
            columns={columns}
            data={bonus.map(t => ({
                ...t,
                easy_part: shortenAnswerline(t.easy_part),
                medium_part: shortenAnswerline(t.medium_part),
                hard_part: shortenAnswerline(t.hard_part),
            }))}
            rowProperties={item => ({
                className: `${[
                    "zero", "ten", "twenty", "thirty"
                ][[
                    item.easy_conversion === 10,
                    item.medium_conversion === 10,
                    item.hard_conversion === 10
                ].filter(Boolean).length
                ]}`
            })}
        />
    );
}
