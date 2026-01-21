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
            tooltip: "Gets where opponent negged beforehand",
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
                    label: "Bonuses",
                    tooltip: "# of Bonuses Heard",
                    defaultDescending: true
                },
                {
                    key: "ppb",
                    label: "PPB",
                    tooltip: "Points per Bonus",
                    format: formatDecimal,
                    defaultDescending: true,
                },
                {
                    key: "easy_conversion",
                    label: "E %",
                    tooltip: "Easy Part Conversion Rate (%)",
                    format: formatPercent,
                    defaultDescending: true,
                },
                {
                    key: "medium_conversion",
                    label: "M %",
                    tooltip: "Medium Part Conversion Rate (%)",
                    format: formatPercent,
                    defaultDescending: true,
                },
                {
                    key: "hard_conversion",
                    label: "H %",
                    tooltip: "Medium Part Conversion Rate (%)",
                    format: formatPercent,
                    defaultDescending: true
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
