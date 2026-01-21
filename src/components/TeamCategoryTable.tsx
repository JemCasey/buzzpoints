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
