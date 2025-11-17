import { BonusDirect, BonusPart } from "@/types";
import Table from "../Table";

type BonusDataProps = {
    parts: BonusPart[],
    directs: BonusDirect[]
    mode?: "tournament" | "set";
    slug?: string;
}

export default function BonusData({ parts, directs, mode, slug }: BonusDataProps) {
    let difficulties = parts.map(part => part.difficulty_modifier.toUpperCase());
    const columns = [
        {
            key: "team_name",
            label: "Team",
            linkTemplate: `/${mode}/${slug}/team/{{team_slug}}`,
        },
        {
            key: "opponent_name",
            label: "Opponent",
            linkTemplate: `/${mode}/${slug}/team/{{opponent_slug}}`,
        },
        {
            key: "part_one",
            label: "Part 1"
        },
        {
            key: "part_two",
            label: "Part 2"
        },
        {
            key: "part_three",
            label: "Part 3"
        },
        {
            key: "total",
            label: "Total",
        },
        {
            key: "parts",
            label: "Parts",
            render: (direct: BonusDirect) => (
                <>
                    {`${[
                        direct.part_one === 10,
                        direct.part_two === 10,
                        direct.part_three === 10
                    ].flatMap((bool, index) => bool ? index : []).map(index => difficulties[index]).join("") || ""
                    }`}
                </>
            )
        }
    ];

    return (
        <Table
            columns={columns}
            data={directs}
            rowProperties={item => ({
                className: `${[
                    "zero", "ten", "twenty", "thirty"
                ][[
                    item.part_one === 10,
                    item.part_two === 10,
                    item.part_three === 10
                ].filter(Boolean).length
                ]}`
            })}
        />
    );
}
