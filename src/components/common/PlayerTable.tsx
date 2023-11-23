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
            label: "Player"
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

    players.map(player => {
        player.name = <u><a href={`player/${encodeURIComponent(player.name)}`}>{player.name}</a></u>;
    });

    return <Table
        compact
        columns={columns}
        data={players}
    />
}
