'use client';

import { QuestionSet } from "@/types";
import Table from "./Table";
import { formatDecimal, formatPercent } from "@/utils";

type QuestionSetSummaryProps = {
    questionSets: QuestionSet[];
    detailPage?: boolean;
}

export default function QuestionSetSummary({ questionSets, detailPage }: QuestionSetSummaryProps) {
    const columns = [
        {
            key: "name",
            label: "Question Set",
            linkTemplate: detailPage ? undefined : "/set/{{slug}}"
        },
        {
            key: "difficulty",
            label: "Difficulty"
        },
        {
            key: "first_mirror",
            label: "Debut",
            defaultSort: "desc" as const
        },
        {
            key: "edition_count",
            label: "Editions"
        },
        {
            key: "tournament_count",
            label: "Mirrors"
        },
        {
            key: "conversion_rate",
            label: "Conv. %",
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
        },
    ];

    return (
        <Table
            columns={columns}
            data={questionSets}
            noSort={!!detailPage}
            noHover={!!detailPage}
        />
    );
}