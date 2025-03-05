"use client";

import Table from "./Table";
import { formatDecimal } from "@/utils";

type PlayerCategoryTableProps = {
    categories: any[];
    format?: "superpowers" | "powers" | "acf";
}

export default function PlayerCategoryTable({ categories, format }: PlayerCategoryTableProps) {
    const columns = [
        {
            key: "category",
            label: "Category"
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
        },
        {
            key: "percent_points",
            label: "% of Points",
            format: formatDecimal,
            defaultDescending: true
        }
    ];

    return <Table
        compact
        columns={columns}
        data={categories}
    />
}
