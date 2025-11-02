"use client";

import Table from "../Table";
import { formatDecimal } from "@/utils";

type PlayerTableProps = {
    players: any[];
    mode?: "tournament" | "set";
    slug?: string;
    format?: "superpowers" | "powers" | "acf";
}

export function PlayerTable({ players, mode, slug, format }: PlayerTableProps) {
    const columns = [
        {
            key: "name",
            label: "Player",
            linkTemplate: `/${mode}/${slug}/player/{{slug}}`,
            html: true
        },
        {
            key: "team_name",
            label: "Team",
            linkTemplate: `/${mode}/${slug}/team/{{team_slug}}`,
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
        {
            key: "negs",
            label: "Negs",
            defaultDescending: true
        },
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
            key: "first_buzzes",
            label: "First Buzzes",
            defaultDescending: true
        },
        {
            key: "top_three_buzzes",
            label: "Top 3 Buzzes",
            defaultDescending: true
        }
    ];

    return <Table
        compact
        columns={columns}
        data={players}
    />
}
