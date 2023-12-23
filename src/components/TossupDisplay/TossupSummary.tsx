import { Buzz, Tossup, TossupSummary, Tournament } from "@/types";
import Table from "../Table";
import { formatDecimal, formatPercent } from "@/utils";

type TossupSummaryProps = {
    tournament?: Tournament;
    tossupSummary: TossupSummary[]
}

export default function TossupSummary({ tournament, tossupSummary }: TossupSummaryProps) {
    let columns = [
        {
            key: 'tournament_name',
            label: 'Tournament',
            linkTemplate: "/tournament/{{tournament_slug}}/tossup/{{round_number}}/{{question_number}}"
        },
        {
            key: 'edition',
            label: 'Edition',
            defaultSort: "asc" as const,
            linkTemplate: "/set/{{set_slug}}/tossup/{{question_slug}}"
        },
        { key: 'exact_match', label: 'Exact Match?' },
        { key: 'tuh', label: 'TUH' },
        { key: 'conversion_rate', label: 'Conv. %', format: formatPercent },
        { key: 'power_rate', label: 'Power %', format: formatPercent },
        { key: 'neg_rate', label: 'Neg %', format: formatPercent },
        { key: 'average_buzz', label: 'Average Buzz', format: formatDecimal }
    ];

    return <div className="my-3 mt-3">
        <Table columns={columns} data={tossupSummary}
            rowProperties={item => ({
                className: item.tournament_id === tournament?.id ? "highlighted-row zero" : ""
            })}
        />
    </div>;
}