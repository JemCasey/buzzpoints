"use client";

import Table from "../Table";
import { formatDecimal } from "@/utils";
import { Tossup } from "@/types";
import { Namefully } from "namefully";

// Temporary workaround for mononym
// https://github.com/ralflorent/namefully/issues/21
function fixMononym(str: string, temp: string = str, before: boolean = false) {
    // Use a regular expression to check for any whitespace character (space, tab, newline, etc.)
    const containsWhitespace = /\s/.test(str);

    if (!containsWhitespace) {
        // If no whitespace is found, it's a single word. Append the string to itself.
        // Use the += operator for a concise solution.
        if (before) {
            str = temp + " " + str;
        } else {
            str += " " + temp;
        }
    }
    return str;
}

type PlayerTableProps = {
    players: Tossup[];
    mode?: "tournament" | "set";
    slug?: string;
    format?: string;
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
        }
    ];

    return <Table
        compact
        columns={columns}
        data={players.map(p => ({
            ...p,
            name: new Namefully(fixMononym(p.name, "‎")).format("l, f m")
        }))}
    />
}
