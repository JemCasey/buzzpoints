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
            tooltip: "Date of the set version used at that mirror",
            defaultSort: "asc" as const,
            linkTemplate: "/set/{{set_slug}}/tossup/{{question_slug}}"
        },
        {
            key: "exact_match",
            label: "Match",
            tooltip: "Was the version displayed here the version used at that mirror?",
            render: (t: any) => (
                <>
                    {t.exact_match == "Y" ? "✓" : "✕"}
                </>
            )
        },
        { key: "heard", label: "Heard", tooltip: "# of Tossups Heard", },
        { key: "conversion_rate", label: "Conv. %", tooltip: "Conversion Rate (%)", format: formatPercent, },
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
        { key: "average_buzz", label: "Avg. Buzz", format: formatDecimal }
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
