"use client";

import Table from "../Table";
import { formatDecimal, formatPercent } from "@/utils";

type TeamTableProps = {
    teams: any[];
    mode?: "set" | "tournament";
    slug?: string;
    format?: string;
    bonuses?: boolean;
}

export function TeamTable({ teams, mode, slug, format, bonuses }: TeamTableProps) {
    const columns = [
        {
            key: "name",
            label: "Team",
            linkTemplate: `/${mode}/${slug}/team/{{slug}}`,
            html: true
        },
        ...(format === "superpowers" ? [{
            key: "superpowers",
            label: "Superpowers",
            defaultDescending: true
        }] : []),
        ...(format !== "acf" ? [{
            key: "powers",
            label: "Powers",
            defaultDescending: true
        }] : []),
        {
            key: "gets",
            label: "Gets",
            defaultDescending: true
        },
        ...(format !== "pace" ? [{
            key: "negs",
            label: "Negs",
            defaultDescending: true
        }] : []),
        {
            key: "rebounds",
            label: "Rebounds",
            defaultDescending: true
        },
        {
            key: "points",
            label: "Points",
            defaultDescending: true
        },
        {
            key: "earliest_buzz",
            label: "Earliest Buzz"
        },
        {
            key: "average_buzz",
            label: "Avg. Buzz",
            format: formatDecimal
        },
        {
            key: "first_buzz",
            label: "First Buzzes",
            defaultDescending: true
        },
        {
            key: "top_three_buzz",
            label: "Top 3 Buzzes",
            defaultDescending: true
        },
        ...(bonuses ?
            [
                {
                    key: "heard",
                    label: "Bonuses"
                },
                {
                    key: "ppb",
                    label: "PPB",
                    format: formatDecimal
                },
                {
                    key: "easy_conversion",
                    label: "E %",
                    format: formatPercent
                },
                {
                    key: "medium_conversion",
                    label: "M %",
                    format: formatPercent
                },
                {
                    key: "hard_conversion",
                    label: "H %",
                    format: formatPercent
                }
            ] : []
        )
    ];

    return <Table
        compact
        columns={columns}
        data={teams}
    />
}
