"use client";

import Table from "./Table";
import { formatDecimal } from "@/utils";

type PlayerCategoryTableProps = {
    categories: any[];
    format?: string;
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
