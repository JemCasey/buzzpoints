'use client';

import { TossupCategory } from "@/types";
import Table from "./Table";
import { formatDecimal, formatPercent } from "@/utils";

type TossupCategoryTableProps = {
    tossupCategoryStats: TossupCategory[]
}

export default function TossupCategoryTable({ tossupCategoryStats }: TossupCategoryTableProps) {
    const columns = [
        {
            key: "category",
            label: "Category"
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
            key: "average_buzz",
            label: "Average Buzz",
            format: formatDecimal
        }                   
    ];

    return <Table columns={columns} data={tossupCategoryStats} />;
}