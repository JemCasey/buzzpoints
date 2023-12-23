'use client';

import { TossupCategory } from "@/types";
import Table from "./Table";
import { formatDecimal, formatPercent } from "@/utils";

type TossupCategoryTableProps = {
    tossupCategoryStats: TossupCategory[];
    categoryLinks?: boolean;
}

export default function TossupCategoryTable({ tossupCategoryStats, categoryLinks = true }: TossupCategoryTableProps) {
    const columns = [
        {
            key: "category",
            label: "Category",
            linkTemplate: categoryLinks ? "/tournament/{{tournament_slug}}/category-tossup/{{category_slug}}" : undefined,
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
        {
            key: "power_rate",
            label: "Power %",
            format: formatPercent
        },
        {
            key: "neg_rate",
            label: "Neg %",
            format: formatPercent
        },
        {
            key: "average_buzz",
            label: "Average Buzz",
            format: formatDecimal
        }
    ];

    return <Table columns={columns} data={tossupCategoryStats} />;
}
