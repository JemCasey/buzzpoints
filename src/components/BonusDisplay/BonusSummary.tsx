import { BonusSummary, Tournament } from "@/types";
import Table from "../Table";
import { formatDecimal, formatPercent } from "@/utils";

type BonusSummaryProps = {
    tournament?: Tournament;
    bonusSummary: BonusSummary[]
}

export default function BonusSummary({ tournament, bonusSummary }: BonusSummaryProps) {
    let columns = [
        {
            key: 'tournament_name',
            label: 'Tournament',
            linkTemplate: "/tournament/{{tournament_slug}}/bonus/{{round_number}}/{{question_number}}"
        },
        {
            key: 'edition',
            label: 'Edition',
            defaultSort: "asc" as const,
            linkTemplate: "/set/{{set_slug}}/bonus/{{question_slug}}"
        },
        { key: 'exact_match', label: 'Exact Match?' },
        { key: 'heard', label: 'Heard' },
        { key: 'ppb', label: 'PPB', format: formatDecimal },
        { key: 'easy_conversion', label: 'Easy %', format: formatPercent },
        { key: 'medium_conversion', label: 'Medium %', format: formatPercent },
        { key: 'hard_conversion', label: 'Hard %', format: formatPercent },
    ];

    return <div className="my-3 mt-3">
        <Table columns={columns} data={bonusSummary}
            rowProperties={item => ({
                className: item.tournament_id === tournament?.id ? "highlighted-row zero" : ""
            })}
        />
    </div>;
}