"use client";

import { BonusCategory } from "@/types";
import Table from "./Table";
import { formatDecimal, formatPercent } from "@/utils";

type TeamCategoryTableProps = {
    bonusCategoryStats: BonusCategory[]
    mode?: "set" | "tournament"
}

export default function TeamCategoryTable({ bonusCategoryStats, mode }: TeamCategoryTableProps) {
    const columns = [
        {
            key: "name",
            label: "Team",
            linkTemplate: `/${mode}/{{slug}}/team/{{teamSlug}}`
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
