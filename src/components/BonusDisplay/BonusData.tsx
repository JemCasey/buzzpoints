import { BonusDirect } from "@/types";
import Table from "../Table";

type BonusDataProps = {
    directs: BonusDirect[]
}

export default function BonusData({ directs }: BonusDataProps) {
    const columns = [
        {
            key: "team_name",
            label: "Team"
        },
        {
            key: "opponent_name",
            label: "Opponent"
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
        }
    ];

    return (
        <Table 
            columns={columns} 
            data={directs} 
        />
    );
}