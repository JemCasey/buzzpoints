"use client";

import { TossupCategory } from "@/types";
import Table from "./Table";
import { formatDecimal, formatPercent } from "@/utils";

type TossupCategoryTableProps = {
    tossupCategoryStats: TossupCategory[];
    categoryLinks?: boolean;
    mode?: "set" | "tournament";
    slug?: string;
    format?: string;
}

export default function TossupCategoryTable({ tossupCategoryStats, categoryLinks = true, mode, slug, format }: TossupCategoryTableProps) {
    const columns = [
        {
            key: "category",
            label: "Category",
            linkTemplate: categoryLinks ? `/${mode}/${slug}/category-tossup/{{category_slug}}` : undefined,
            html: true
        },
        {
            key: "heard",
            label: "Heard"
        },
        {
            key: "conversion_rate",
            label: "Conv %",
            format: formatPercent
        },
        ...(format === "superpowers" ? [{
            key: "superpower_rate",
            label: "Superpower %",
            format: formatPercent,
        }] : []),
        ...(format !== "acf" ? [{
            key: "power_rate",
            label: "Power %",
            format: formatPercent,
        }] : []),
        ...(format !== "pace" ? [{
            key: "neg_rate",
            label: "Neg %",
            format: formatPercent
        }] : []),
        {
            key: "average_buzz",
            label: "Average Buzz",
            format: formatDecimal
        }
    ];

    return <Table columns={columns} data={tossupCategoryStats} />;
}
