"use client";

import { BonusCategory } from "@/types";
import Table from "./Table";
import { formatDecimal, formatPercent } from "@/utils";

type BonusCategoryTableProps = {
    bonusCategoryStats: BonusCategory[];
    categoryLinks?: boolean;
    mode?: "set" | "tournament";
    slug?: string;
}

export default function BonusCategoryTable({ bonusCategoryStats, categoryLinks = true, mode, slug }: BonusCategoryTableProps) {
    const columns = [
        {
            key: "category",
            label: "Category",
            linkTemplate: categoryLinks ? `/${mode}/${slug}/category-bonus/{{category_slug}}` : undefined,
            html: true
        },
        {
            key: "heard",
            label: "Heard",
            defaultDescending: true
        },
        {
            key: "ppb",
            label: "PPB",
            format: formatDecimal,
            defaultDescending: true
        },
        {
            key: "easy_conversion",
            label: "Easy %",
            format: formatPercent,
            defaultDescending: true
        },
        {
            key: "medium_conversion",
            label: "Medium %",
            format: formatPercent,
            defaultDescending: true
        },
        {
            key: "hard_conversion",
            label: "Hard %",
            format: formatPercent,
            defaultDescending: true
        }
    ];

    return <Table columns={columns} data={bonusCategoryStats} />;
}
