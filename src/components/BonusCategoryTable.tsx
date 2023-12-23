'use client';

import { BonusCategory } from "@/types";
import Table from "./Table";
import { formatDecimal, formatPercent } from "@/utils";

type BonusCategoryTableProps = {
    bonusCategoryStats: BonusCategory[];
    categoryLinks?: boolean;
}

export default function BonusCategoryTable({ bonusCategoryStats, categoryLinks = true }: BonusCategoryTableProps) {
    const columns = [
        {
            key: "category",
            label: "Category",
            linkTemplate: categoryLinks ? "/tournament/{{tournament_slug}}/category-bonus/{{category_slug}}" : undefined,
            html: true
        },
        {
            key: "heard",
            label: "Heard"
        },
        {
            key: "ppb",
            label: "PPB",
            format: formatDecimal
        },
        {
            key: "easy_conversion",
            label: "Easy %",
            format: formatPercent
        },
        {
            key: "medium_conversion",
            label: "Medium %",
            format: formatPercent
        },
        {
            key: "hard_conversion",
            label: "Hard %",
            format: formatPercent
        }
    ];

    return <Table columns={columns} data={bonusCategoryStats} />;
}
