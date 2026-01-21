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
    ];

    return <Table columns={columns} data={bonusCategoryStats} />;
}
