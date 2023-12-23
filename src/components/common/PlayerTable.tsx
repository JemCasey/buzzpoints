'use client';

import Table from "../Table";
import { formatDecimal } from "@/utils";

type PlayerTableProps = {
    players: any[]
}

export function PlayerTable({ players }: PlayerTableProps) {
    const columns = [
        {
            key: "name",
            label: "Player",
            linkTemplate: "/tournament/{{tournament_slug}}/player/{{slug}}",
            html: true
        },
        {
            key: "team_name",
            label: "Team",
            linkTemplate: "/tournament/{{tournament_slug}}/team/{{team_slug}}",
            html: true
        },
        {
            key: "powers",
            label: "Powers",
            defaultDescending: true
        },
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
            key: "bouncebacks",
            label: "Bouncebacks",
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
