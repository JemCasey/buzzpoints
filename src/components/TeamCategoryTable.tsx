'use client';

import { BonusCategory } from "@/types";
import Table from "./Table";
import { formatDecimal, formatPercent } from "@/utils";

type TeamCategoryTableProps = {
    bonusCategoryStats: BonusCategory[]
}

export default function TeamCategoryTable({ bonusCategoryStats }: TeamCategoryTableProps) {
    const columns = [
        {
            key: "name",
            label: "Team Name",
            linkTemplate: "/tournament/{{slug}}/team/{{teamSlug}}"
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
