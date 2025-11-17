"use client";

import Table from "../Table";
import { formatDecimal, shortenAnswerline } from "@/utils";

type PlayerBuzzTableProps = {
    buzzes: any[];
    mode?: "tournament" | "set";
    slug?: string;
};

export function PlayerBuzzTable({ buzzes, mode, slug }: PlayerBuzzTableProps) {
    const columns = [
        {
            key: "round",
            label: "Round",
        },
        {
            key: "question_number",
            label: "#",
        },
        {
            key: "category",
            label: "Category",
            linkTemplate: `/${mode}/${slug}/category-tossup/{{category_slug}}`,
            html: true
        },
        {
            key: "answer",
            label: "Answer",
            linkTemplate: `/${mode}/${slug}/tossup/{{question_slug}}`,
            html: true,
            sortKey: "answer_primary",
        },
        {
            key: "buzz_position",
            label: "Buzzpoint",
            defaultDescending: true,
        },
        {
            key: "value",
            label: "Value",
        },
        {
            key: "first_buzz",
            label: "First",
            render: (b: any) => (
                <>
                    {b.first_buzz > 0 ? "✓" : ""}
                </>
            )
        },
        {
            key: "top_three_buzz",
            label: "Top 3",
            render: (b: any) => (
                <>
                    {b.top_three_buzz > 0 ? "✓" : ""}
                </>
            )
        },
        {
            key: "buzz_rank",
            label: "Rank",
            render: (b: any) => (
                <>
                    {b.buzz_rank > 0 ? b.buzz_rank : ""}
                </>
            )
        },
        {
            key: "rebound",
            label: "Rebound",
            render: (b: any) => (
                <>
                    {b.rebound > 0 ? "✓" : "✕"}
                </>
            )
        }
    ];

    return <Table
        compact
        columns={columns}
        data={buzzes.map(b => ({
            ...b,
            answer: shortenAnswerline(b.answer)
        }))}
        rowProperties={item => ({
            className: `${
                (item.value == 20 ?
                    "superpower" :
                    (item.value == 15 ?
                        "power" :
                        (item.value > 0 ?
                            "get" :
                            (item.value < 0 ?
                                "neg" :
                                "dnc")
                        )
                    )
                )
            }`
        })}
    />;
}
