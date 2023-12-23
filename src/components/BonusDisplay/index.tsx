"use client";

import Link from 'next/link';
import BonusData from './BonusData';
import BonusText from './BonusText';
import BonusSummaryDisplay from './BonusSummary';
import { BonusDirect, BonusPart, BonusSummary, QuestionSet, Tournament } from '@/types';

type BonusDisplayProps = {
    parts: BonusPart[];
    directs: BonusDirect[];
    tournament?: Tournament;
    questionSet?: QuestionSet;
    navOptions?: any;
    bonusSummary: BonusSummary[]
}

export default function BonusDisplay({ parts, directs, tournament, questionSet, navOptions, bonusSummary }: BonusDisplayProps) {   
    return <div className="flex flex-col md:flex-row md:space-x-10">
        <div className="md:basis-1/2">
            <h3 className="text-xl font-bold my-3">Question</h3>
            {!!navOptions && !!tournament && <div className="mb-2">
                {!!navOptions.previous && <Link href={`/tournament/${tournament.slug}/bonus/${navOptions.previous.round}/${navOptions.previous.number}`} className="underline">Previous bonus</Link>}
                {!!navOptions.previous && !!navOptions.next && " - "}
                {!!navOptions.next && <Link href={`/tournament/${tournament.slug}/bonus/${navOptions.next.round}/${navOptions.next.number}`} className="underline">Next bonus</Link>}
            </div>}
            <BonusText parts={parts} />
            {!!parts[0]?.metadata && <div>{"<" + parts[0]?.metadata + ">"}</div>}
            {(!!tournament || !!questionSet) && <p className="mt-2">
                <Link 
                    href={tournament ? `/tournament/${tournament.slug}/bonus` : `/set/${questionSet!.slug}/bonus`} 
                    className="underline"
                >
                    Back to bonuses
                </Link>
            </p>}
        </div>
        <div className="md:basis-1/2">
            <h3 className="text-xl font-bold my-3">Data</h3>
            <div className="buzzes">
                <BonusData directs={directs} />
            </div>
            <h3 className="text-xl font-bold my-3">Summary</h3>
                <div>
                    <BonusSummaryDisplay bonusSummary={bonusSummary} tournament={tournament} />
                </div>
        </div>
    </div>
}