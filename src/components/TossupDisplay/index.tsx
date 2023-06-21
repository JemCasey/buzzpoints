'use client';

import TossupText from './TossupText';
import TossupBuzzes from './TossupBuzzes';
import { useState } from 'react';
import Link from 'next/link';
import TossupSummary from './TossupSummary';
import { Buzz, BuzzDictionary, Tossup, Tournament } from '@/types';

type TossupProps = {
    tossup: Tossup;
    buzzes: Buzz[];
    tournament: Tournament;
}

export default function TossupDisplay({ tossup, buzzes, tournament }:TossupProps) {
    const [buzzpoint, setBuzzpoint] = useState<number | null>(null);
    const buzzDictionary:BuzzDictionary = buzzes.reduce((a, b) => ({
        ...a,
        [b.buzz_position]: [...a[b.buzz_position] || [], b.value]
    }), {} as BuzzDictionary);

    return (
        <div className="flex flex-col md:flex-row md:space-x-10">
            <div className="md:basis-1/2">
                <h3 className="text-xl font-bold my-3">Question</h3>
                <TossupText tossup={tossup}
                    buzzes={buzzDictionary}
                    buzzpoint={buzzpoint}
                    setBuzzpoint={(buzzpoint:number) => setBuzzpoint(buzzpoint)} />
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