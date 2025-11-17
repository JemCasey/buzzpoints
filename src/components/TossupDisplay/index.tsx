"use client";

import TossupText from "./TossupText";
import TossupBuzzes from "./TossupBuzzes";
import { useState } from "react";
import Link from "next/link";
import TossupSummaryDisplay from "./TossupSummary";
import { Buzz, BuzzDictionary, QuestionSet, Tossup, TossupSummary, Tournament } from "@/types";
import TossupGraph from "./TossupGraph";

type TossupProps = {
    tossup: Tossup;
    buzzes: Buzz[];
    tournament?: Tournament;
    questionSet?: QuestionSet;
    navOptions?: any;
    tossupSummary: TossupSummary[]
}

export default function TossupDisplay({ tossup, buzzes, tournament, questionSet, navOptions, tossupSummary }: TossupProps) {
    const [hoverPosition, setHoverPosition] = useState<number | null>(null);
    const [buzzpoint, setBuzzpoint] = useState<number | null>(null);
    const buzzDictionary: BuzzDictionary = buzzes.reduce((a, b) => ({
        ...a,
        [b.buzz_position]: [...a[b.buzz_position] || [], b.value]
    }), {} as BuzzDictionary);

    let questionHeader = "";
    if (!!tossup.round) {
        questionHeader = `Round ${tossup.round}: `;
    } else if (tossup.packet_descriptor.length < 3) {
        questionHeader = `Packet ${tossup.packet_descriptor}: `
    } else if (!!tossup.packet_number) {
        questionHeader = `Packet ${tossup.packet_number}: `;
    }
    questionHeader += `Tossup ${tossup.question_number}`;

    return (
        <div className="flex flex-col md:flex-row md:space-x-10">
            <div className="md:basis-1/2">
                {!!navOptions && !!tournament && <div className="mb-2">
                    {!!navOptions.previous && <Link href={`/tournament/${tournament.slug}/tossup/${navOptions.previous.round}/${navOptions.previous.number}`} className="underline">Previous tossup</Link>}
                    {!!navOptions.previous && !!navOptions.next && " - "}
                    {!!navOptions.next && <Link href={`/tournament/${tournament.slug}/tossup/${navOptions.next.round}/${navOptions.next.number}`} className="underline">Next tossup</Link>}
                </div>}
                <h3 className="text-xl font-bold my-3">{questionHeader}</h3>
                <TossupText tossup={tossup}
                    buzzes={buzzDictionary}
                    hoverPosition={hoverPosition}
                    averageBuzz={tossup.average_buzz}
                    buzzpoint={buzzpoint}
                    onBuzzpointChange={(buzzpoint: number) => setBuzzpoint(buzzpoint)}
                />
                <TossupGraph
                    buzzes={buzzDictionary}
                    onHoverPositionChange={(position) => setHoverPosition(position)}
                />
                {(!!tournament || !!questionSet) && <p className="flex-shrink-2 bg-blue-500 hover:bg-blue-700 text-white py-1.5 px-4 rounded" style={{width : "30%", textAlign: "center"}}>
                    <Link
                        href={tournament ? `/tournament/${tournament.slug}/tossup` : `/set/${questionSet!.slug}/tossup`}
                        className="underline"
                    >
                        Back to tossups
                    </Link>
                </p>}
            </div>
            <div className="md:basis-1/2">
                <h3 className="text-xl font-bold my-3">Buzzes</h3>
                <div className="buzzes">
                    <TossupBuzzes
                        buzzes={buzzes}
                        buzzpoint={buzzpoint}
                        setBuzzpoint={setBuzzpoint}
                        mode={tournament ? "tournament" : "set"}
                        slug={tournament ? tournament!.slug : questionSet!.slug}
                    />
                </div>
                <br></br>
                <h3 className="text-xl font-bold">Summary</h3>
                <div>
                    <TossupSummaryDisplay
                        tossupSummary={tossupSummary}
                        tournament={tournament}
                        format={tournament ? tournament!.question_set!.format : questionSet!.format}
                    />
                </div>
            </div>
        </div>
    );
}
