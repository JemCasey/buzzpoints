"use client";

import { Bonus } from "@/types";
import Table from "../Table";
import { formatDecimal, formatPercent, parseRoundNumber, shortenAnswerline } from "@/utils";
import Link from "next/link";

type TournamentBonusTableProps = {
    bonuses: Bonus[]
}

export function TournamentBonusTable({ bonuses }: TournamentBonusTableProps) {
    const columns = [
        {
            key: "round",
            label: "Round"
        },
        {
            key: "packet_descriptor",
            label: "Packet"
        },
        {
            key: "question_number",
            label: "#"
        },
        {
            key: "category",
            label: "Category"
        },
        {
            key: "heard",
            label: "Heard",
            tooltip: "# of Bonuses Heard",
        },
        {
            key: "ppb",
            label: "PPB",
            format: formatDecimal
        },
        {
            key: "easy_part",
            label: "Easy",
            sortKey: "easy_part_sanitized",
            render: (item: Bonus) => (
                <>
                    <Link
                        href={`/tournament/${item.tournament_slug}/bonus/${item.round}/${item.question_number}`}
                        className="underline"
                    >
                        <span dangerouslySetInnerHTML={{ __html: item.easy_part }}></span>
                    </Link>
                    <span className="ms-1 text-xs font-light">{`(${item.easy_part_number})`}</span>
                </>
            )
        },
        {
            key: "easy_conversion",
            label: "%",
            tooltip: "Easy Part Conversion Rate (%)",
            format: formatPercent
        },
        {
            key: "medium_part",
            label: "Medium",
            sortKey: "medium_part_sanitized",
            render: (item: Bonus) => (
                <>
                    <Link
                        href={`/tournament/${item.tournament_slug}/bonus/${item.round}/${item.question_number}`}
                        className="underline"
                    >
                        <span dangerouslySetInnerHTML={{ __html: item.medium_part }}></span>
                    </Link>
                    <span className="ms-1 text-xs font-light">{`(${item.medium_part_number})`}</span>
                </>
            )
        },
        {
            key: "medium_conversion",
            label: "%",
            tooltip: "Medium Part Conversion Rate (%)",
            format: formatPercent
        },
        {
            key: "hard_part",
            label: "Hard",
            sortKey: "hard_part_sanitized",
            render: (item: Bonus) => (
                <>
                    <Link
                        href={`/tournament/${item.tournament_slug}/bonus/${item.round}/${item.question_number}`}
                        className="underline"
                    >
                        <span dangerouslySetInnerHTML={{ __html: item.hard_part }}></span>
                    </Link>
                    <span className="ms-1 text-xs font-light">{`(${item.hard_part_number})`}</span>
                </>
            )
        },
        {
            key: "hard_conversion",
            label: "%",
            tooltip: "Hard Part Conversion Rate (%)",
            format: formatPercent
        }
    ];

    return <Table
        columns={columns}
        data={bonuses.map(b => ({
            ...b,
            round: parseRoundNumber(b.round),
            easy_part: shortenAnswerline(b.easy_part),
            medium_part: shortenAnswerline(b.medium_part),
            hard_part: shortenAnswerline(b.hard_part),
        }))}
        compact
    />
}
