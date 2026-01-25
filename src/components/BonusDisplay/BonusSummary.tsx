import { BonusSummary, Tournament } from "@/types";
import Table from "../Table";
import { formatDecimal, formatPercent } from "@/utils";

type BonusSummaryProps = {
    tournament?: Tournament;
    bonusSummary: BonusSummary[]
}

export default function BonusSummaryFunc({ tournament, bonusSummary }: BonusSummaryProps) {
    let columns = [
        {
            key: "tournament_name",
            label: "Tournament",
            linkTemplate: "/tournament/{{tournament_slug}}/bonus/{{round_number}}/{{question_number}}"
        },
        {
            key: "edition",
            label: "Edition",
            tooltip: "Date or ID of the set version used at that mirror",
            defaultSort: "asc" as const,
            linkTemplate: "/set/{{set_slug}}/bonus/{{question_slug}}"
        },
        {
            key: "exact_match",
            label: "Match",
            tooltip: "Was the version displayed here the version played at that mirror?",
            render: (b: any) => (
                <>
                    {b.exact_match == "Y" ? "✓" : "✕"}
                </>
            )
        },
        { key: "heard", label: "Heard", tooltip: "# of Bonuses Heard", },
        { key: "ppb", label: "PPB", tooltip: "Points per Bonus", format: formatDecimal },
        { key: "easy_conversion", label: "E %", tooltip: "Easy Part Conversion Rate (%)", format: formatPercent },
        { key: "medium_conversion", label: "M %", tooltip: "Medium Part Conversion Rate (%)", format: formatPercent },
        { key: "hard_conversion", label: "H %", tooltip: "Hard Part Conversion Rate (%)", format: formatPercent },
    ];

    return <div className="my-3 mt-3">
        <Table
            columns={columns}
            data={bonusSummary}
            rowProperties={item => ({
                className: item.tournament_id === tournament?.id ? "highlighted-row current" : ""
            })}
        />
    </div>;
}
