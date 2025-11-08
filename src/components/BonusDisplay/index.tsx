"use client";

import Link from "next/link";
import BonusData from "./BonusData";
import BonusText from "./BonusText";
import BonusSummaryDisplay from "./BonusSummary";
import { Bonus, BonusDirect, BonusPart, BonusSummary, QuestionSet, Tournament } from "@/types";
import { BonusTable } from "../common/BonusTable";
import { removeBadPunc } from "@/utils";

type BonusDisplayProps = {
    bonus: Bonus;
    parts: BonusPart[];
    directs: BonusDirect[];
    tournament?: Tournament;
    questionSet?: QuestionSet;
    navOptions?: any;
    bonusSummary: BonusSummary[]
}

export default function BonusDisplay({ bonus, parts, directs, tournament, questionSet, navOptions, bonusSummary }: BonusDisplayProps) {
    return <div className="flex flex-col md:flex-row md:space-x-10">
        <div className="md:basis-1/2">
            {!!navOptions && !!tournament && <div className="mb-2">
                {!!navOptions.previous && <Link href={`/tournament/${tournament.slug}/bonus/${navOptions.previous.round}/${navOptions.previous.number}`} className="underline">Previous bonus</Link>}
                {!!navOptions.previous && !!navOptions.next && " - "}
                {!!navOptions.next && <Link href={`/tournament/${tournament.slug}/bonus/${navOptions.next.round}/${navOptions.next.number}`} className="underline">Next bonus</Link>}
            </div>}
            <h3 className="text-xl font-bold my-3">{!!bonus.round ? `Round ${bonus.round}: ` : (!!bonus.packet_number ? `Packet ${bonus.packet_number}: ` : "")}Bonus {bonus.question_number}</h3>
            <BonusText parts={parts} />
            <div>
                {!!parts[0]?.metadata && <span>{"<" + removeBadPunc(parts[0]?.metadata) + ">"}</span>}
                {bonus.packet_name && <span>&nbsp;|&nbsp;{removeBadPunc(bonus.packet_name)}</span>}
            </div>
            <br></br>
            <BonusTable bonuses={[bonus]} mode="summary" />
            {(!!tournament || !!questionSet) && <p className="flex-shrink-2 bg-blue-500 hover:bg-blue-700 text-white py-1.5 px-4 rounded" style={{width : "30%", textAlign: "center", marginTop: "3%", marginBottom: "3%"}}>
                <Link
                    href={tournament ? `/tournament/${tournament.slug}/bonus` : `/set/${questionSet!.slug}/bonus`}
                    className="underline"
                >
                    Back to bonuses
                </Link>
            </p>}
        </div>
        <div className="md:basis-1/2">
            <h3 className="text-xl font-bold my-3">Conversion</h3>
            <div className="buzzes">
                <BonusData
                    parts={parts}
                    directs={directs}
                    mode={tournament? "tournament" : "set"}
                    slug={tournament? tournament!.slug : questionSet!.slug}
                />
            </div>
            <br></br>
            <h3 className="text-xl font-bold">Summary</h3>
            <div>
                <BonusSummaryDisplay bonusSummary={bonusSummary} tournament={tournament} />
            </div>
        </div>
    </div>
}
