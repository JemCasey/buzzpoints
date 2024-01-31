import Link from "next/link";
import TournamentSummary from "@/components/TournamentSummary";
import TossupCategoryTable from "@/components/TossupCategoryTable";
import Layout from "@/components/Layout";
import { getTournamentBySlug, getBonusCategoryStatsQuery, getQuestionSetQuery, getTossupCategoryStatsQuery, getTournamentBySlugQuery, getTournamentsQuery } from "@/utils/queries";
import { Metadata } from "next";
import { BonusCategory, QuestionSet, TossupCategory, Tournament } from "@/types";
import BonusCategoryTable from "@/components/BonusCategoryTable";

export async function generateStaticParams() {
    const tournaments = getTournamentsQuery.all() as Tournament[];

    return tournaments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    let tournament = getTournamentBySlug(params.slug);

    return {
        title: `${tournament.name} - Buzzpoints App`,
        description: `Category conversion data for ${tournament!.name}`,
    };
}

export default function Tournament({ params }: { params: { slug: string } }) {
    const tournament = getTournamentBySlug(params.slug);
    const questionSet = getQuestionSetQuery.get(tournament.question_set_edition_id) as QuestionSet;
    const tossupCategoryStats = getTossupCategoryStatsQuery.all(tournament.id) as TossupCategory[];
    const bonusCategoryStats = getBonusCategoryStatsQuery.all(tournament.id) as BonusCategory[];

    return (
        <Layout tournament={tournament}>
            <TournamentSummary
                tournament={{
                    ...tournament,
                    question_set: questionSet
                }}
            />
            <div className="flex flex-col md:flex-row md:space-x-10 mt-5">
                <div className="md:basis-1/2">
                    <h5 className="text-lg font-bold my-2">Tossups</h5>
                    <p className="mb-2"><Link href={`/tournament/${tournament.slug}/tossup`} className="underline">View all tossups</Link></p>
                    <TossupCategoryTable tossupCategoryStats={tossupCategoryStats} />
                </div>
                <div className="md:basis-1/2">
                    <h5 className="text-lg font-bold my-2">Bonuses</h5>
                    <p className="mb-2"><Link href={`/tournament/${tournament.slug}/bonus`} className="underline">View all bonuses</Link></p>
                    <BonusCategoryTable bonusCategoryStats={bonusCategoryStats}/>
                </div>
            </div>
        </Layout>
    );
}