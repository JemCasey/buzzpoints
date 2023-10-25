'use client';

import { shortenAnswerline } from "@/utils";
import Table from "../Table";

type BuzzTableProps = {
    buzzes: any[]
}

export function BuzzTable({ buzzes }: BuzzTableProps) {
    const columns = [
        {
            key: "round",
            label: "Round",
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
            html: true
        },
        {
            key: "value",
            label: "Value"
        },
        {
            key: "buzz_position",
            label: "Buzz Position"
        },
    ];

    return <Table
        compact
        columns={columns}
        data={buzzes.map(b => ({
            ...b,
            answer: shortenAnswerline(b.answer)
        }))}
    />
}