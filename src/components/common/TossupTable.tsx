'use client';

import { Tossup } from "@/types";
import Table from "../Table";
import { formatDecimal, formatPercent, shortenAnswerline } from "@/utils";

type TossupTableProps = {
    tossups: Tossup[]
}

export function TossupTable({ tossups }: TossupTableProps) {
    const columns = [
        {
            key: "round",
            label: "Round"
        },
        {
            key: "question_number",
            label: "#"
        },
        {
            key: "category",
            label: "Category"
        },
        {
            key: "answer",
            label: "Answer",
            linkTemplate: "/tournament/{{tournament_slug}}/tossup/{{round}}/{{question_number}}",
            html: true,
            sortKey: "answer_primary"
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