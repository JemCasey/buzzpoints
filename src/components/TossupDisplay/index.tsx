'use client';

import TossupText from './TossupText';
import TossupBuzzes from './TossupBuzzes';
import { useState } from 'react';
import Link from 'next/link';
import TossupSummary from './TossupSummary';
import { Buzz, BuzzDictionary, Tossup, Tournament } from '@/types';
import TossupGraph from './TossupGraph';

type TossupProps = {
    tossup: Tossup;
    buzzes: Buzz[];
    tournament: Tournament;
    navOptions: any;
}

export default function TossupDisplay({ tossup, buzzes, tournament, navOptions }:TossupProps) {
    const [hoverPosition, setHoverPosition] = useState<number | null>(null);
    const [buzzpoint, setBuzzpoint] = useState<number | null>(null);
    const buzzDictionary:BuzzDictionary = buzzes.reduce((a, b) => ({
        ...a,
        [b.buzz_position]: [...a[b.buzz_position] || [], b.value]
    }), {} as BuzzDictionary);
    
    return (
        <div className="flex flex-col md:flex-row md:space-x-10">
            <div className="md:basis-1/2">
                <h3 className="text-xl font-bold my-3">Question</h3>
                <div className="mb-2">{!!navOptions.previous && <Link href={`/tournament/${tournament.slug}/tossup/${navOptions.previous.round}/${navOptions.previous.number}`} className="underline">Previous tossup</Link>}{!!navOptions.previous && !!navOptions.next && " - "}{!!navOptions.next && <Link href={`/tournament/${tournament.slug}/tossup/${navOptions.next.round}/${navOptions.next.number}`} className="underline">Next tossup</Link>}</div>
                <TossupText tossup={tossup}
                    buzzes={buzzDictionary}
                    hoverPosition={hoverPosition}
                    averageBuzz={tossup.average_buzz}
                    buzzpoint={buzzpoint}
                    onBuzzpointChange={(buzzpoint:number) => setBuzzpoint(buzzpoint)} />
                <TossupGraph 
                    buzzes={buzzDictionary}
                    onHoverPositionChange={(position) => setHoverPosition(position)}
                />
                <TossupSummary buzzes={buzzes} tossup={tossup} />
                <p className="mb-2"><Link href={`/tournament/${tournament.slug}/tossup`} className="underline">Back to tossups</Link></p>
            </div>
            <div className="md:basis-1/2 buzzes">
                <h3 className="text-xl font-bold my-3">Buzzes</h3>
                <TossupBuzzes buzzes={buzzes}
                    buzzpoint={buzzpoint}
                    setBuzzpoint={setBuzzpoint} />
            </div>
        </div>
    );
}