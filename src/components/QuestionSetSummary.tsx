"use client";

import { QuestionSet } from "@/types";
import Table from "./Table";
import { formatDecimal, formatPercent } from "@/utils";

type QuestionSetSummaryProps = {
    questionSets: QuestionSet[];
    detailPage?: boolean;
    format?: string;
    bonuses?: boolean;
}

export default function QuestionSetSummary({ questionSets, detailPage, format, bonuses }: QuestionSetSummaryProps) {
    const columns = [
        ...(detailPage ? [] : [{
            key: "name",
            label: "Question",
            linkTemplate: "/set/{{slug}}"
        }]),
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
        ...(format === "superpowers" ?
            [
                {
                    key: "superpower_rate",
                    label: "Superpower %",
                    format: formatPercent,
                }
            ] : []
        ),
        ...(format !== "acf" ?
            [
                {
                    key: "power_rate",
                    label: "Power %",
                    format: formatPercent,
                }
            ] : []
        ),
        ...(format !== "pace" ?
            [
                {
                    key: "neg_rate",
                    label: "Neg %",
                    format: formatPercent
                }
            ] : []
        ),
        ...(bonuses ?
            [
                {
                    key: "ppb",
                    label: "PPB",
                    format: formatDecimal
                },
                {
                    key: "easy_conversion",
                    label: "E %",
                    format: formatPercent
                },
                {
                    key: "medium_conversion",
                    label: "M %",
                    format: formatPercent
                },
                {
                    key: "hard_conversion",
                    label: "H %",
                    format: formatPercent
                }
            ] : []
        )
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
