import { Buzz, Tossup, TossupSummary, Tournament } from "@/types";
import Table from "../Table";
import { formatDecimal, formatPercent } from "@/utils";

type TossupSummaryProps = {
    tossupSummary: TossupSummary[];
    tournament?: Tournament;
    format?: string;
}

export default function TossupSummaryFunc({ tossupSummary, tournament, format }: TossupSummaryProps) {
    let columns = [
        {
            key: "tournament_name",
            label: "Tournament",
            linkTemplate: "/tournament/{{tournament_slug}}/tossup/{{round_number}}/{{question_number}}"
        },
        {
            key: "edition",
            label: "Edition",
            defaultSort: "asc" as const,
            linkTemplate: "/set/{{set_slug}}/tossup/{{question_slug}}"
        },
        { key: "tuh", label: "TUH" },
        { key: "conversion_rate", label: "Conv. %", format: formatPercent },
        ...(format === "superpowers" ? [{
            key: "superpower_rate",
            label: "Superpower %",
            format: formatPercent,
        }] : []),
        ...(format !== "acf" ? [{
            key: "power_rate",
            label: "Power %",
            format: formatPercent,
        }] : []),
        ...(format !== "pace" ? [{
            key: "neg_rate",
            label: "Neg %",
            format: formatPercent
        }] : []),
        { key: "average_buzz", label: "Average Buzz", format: formatDecimal }
    ];

    return <div className="my-3 mt-3">
        <Table
            columns={columns}
            data={tossupSummary}
            rowProperties={item => ({
                className: item.tournament_id === tournament?.id ? "highlighted-row current" : ""
            })}
        />
    </div>;
}
