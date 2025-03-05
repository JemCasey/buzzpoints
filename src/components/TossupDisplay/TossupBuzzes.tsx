import Table from "../Table";
import { Buzz } from "@/types";

type TossupBuzzesProps = {
    buzzes: Buzz[];
    buzzpoint: number | null;
    setBuzzpoint: (buzzpoint: number) => void;
    mode?: "tournament" | "set";
    slug?: string;
}

export default function TossupBuzzes({ buzzes, buzzpoint, setBuzzpoint, mode, slug }: TossupBuzzesProps) {
    const columns = [
        {
            key: "player_name",
            label: "Player",
            linkTemplate: `/${mode}/${slug}/player/{{player_slug}}`,
        },
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
            key: "buzz_position",
            label: "Position",
            defaultSort: "asc" as const
        },
        {
            key: "value",
            label: "Value"
        }
    ];

    return (
        <Table
            columns={columns}
            data={buzzes}
            rowProperties={item => ({
                onClick: () => setBuzzpoint(item.buzz_position),
                style: {
                    cursor: "pointer"
                },
                className: `${item.buzz_position === buzzpoint ? "highlighted-row" : ""} ${
                    (item.value == 20 ?
                        "superpower" :
                        (item.value == 15 ?
                            "power" :
                            (item.value > 0 ?
                                "get" :
                                (item.value < 0 ?
                                    "neg" :
                                    "dnc")
                            )
                        )
                    )
                }`
            })}
        />
    );
}
