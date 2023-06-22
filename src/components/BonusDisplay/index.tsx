import Link from 'next/link';
import BonusData from './BonusData';
import BonusText from './BonusText';
import { BonusDirect, BonusPart, Tournament } from '@/types';

type BonusDisplayProps = {
    parts: BonusPart[];
    directs: BonusDirect[];
    tournament: Tournament;
}

export default function BonusDisplay({ parts, directs, tournament }: BonusDisplayProps) {   
    return <div className="flex md:flex-row sm:flex-column md:space-x-10">
        <div className="md:basis-1/2">
            <h3 className="text-xl font-bold my-3">Question</h3>
            <BonusText parts={parts} />
            <p className="mt-2"><Link href={`/tournament/${tournament.slug}/bonus`} className="underline">Back to bonuses</Link></p>
        </div>
        <div className="md:basis-1/2 buzzes">
            <h3 className="text-xl font-bold my-3">Data</h3>
            <BonusData directs={directs} />
        </div>
    </div>
}