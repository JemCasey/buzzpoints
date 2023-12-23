'use client';

import { Tossup } from "@/types";
import Table from "../Table";
import { formatDecimal, formatPercent, shortenAnswerline } from "@/utils";

type TournamentTossupTableProps = {
    tossups: Tossup[]
}

export function TournamentTossupTable({ tossups }: TournamentTossupTableProps) {
    const columns = [
        {
            key: "category",
            label: "Category"
        },
        {
            key: "answer",
            label: "Answer",
            linkTemplate: "/set/{{set_slug}}/tossup/{{slug}}",
            html: true,
            sortKey: "answer_primary"
        },
        {
            key: "editions",
            label: "Editions"
        },
        {
            key: "heard",
            label: "Heard"
        },
        {
            key: "conversion_rate",
            label: "Conv. %",
            format: formatPercent
        },
        {
            key: "power_rate",
            label: "Power %",
            format: formatPercent
        },
        {
            key: "neg_rate",
            label: "Neg %",
            format: formatPercent
        },
        {
            key: "first_buzz",
            label: "First Buzz"
        },
        {
            key: "average_buzz",
            label: "Average Buzz",
            format: formatDecimal
        }
    ];

    return <Table
        compact
        columns={columns}
        data={tossups.map(t => ({
            ...t,
            answer: shortenAnswerline(t.answer)
        }))}
    />
}