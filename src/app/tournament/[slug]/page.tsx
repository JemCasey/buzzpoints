import Link from "next/link";
import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getTournamentBySlug, getBonusCategoryStatsQuery, getTossupCategoryStatsQuery, getTournamentsQuery } from "@/utils/queries";
import { TossupCategory, BonusCategory, Tournament } from "@/types";
import TournamentSummary from "@/components/TournamentSummary";
import TossupCategoryTable from "@/components/TossupCategoryTable";
import BonusCategoryTable from "@/components/BonusCategoryTable";

export async function generateStaticParams() {
    const tournaments = getTournamentsQuery.all() as Tournament[];

    return tournaments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    let tournament = getTournamentBySlug(params.slug);

    return {
        title: `${tournament.name} - Buzzpoints`,
        description: `Category conversion data for ${tournament!.name}`,
    };
}

export default async function TournamentFunc(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const tournament = getTournamentBySlug(params.slug);
    const tossupCategoryStats = getTossupCategoryStatsQuery.all(tournament.id) as TossupCategory[];
    const bonusCategoryStats = getBonusCategoryStatsQuery.all(tournament.id) as BonusCategory[];

    return (
        <Layout tournament={tournament}>
            <TournamentSummary
                tournament={{
                    ...tournament,
                    question_set: tournament.question_set
                }}
            />
            <div className="flex flex-col md:flex-row md:space-x-10 mt-5">
                <div className="md:basis-1/2">
                    <h5 className="text-lg font-bold my-2">Tossups</h5>
                    <p className="mb-2"><Link href={`/tournament/${tournament.slug}/tossup`} className="underline">View all tossups</Link></p>
                    <TossupCategoryTable
                        tossupCategoryStats={tossupCategoryStats}
                        mode="tournament"
                        slug={params.slug}
                        format="powers"
                    />
                </div>
                <div className="md:basis-1/2">
                    <h5 className="text-lg font-bold my-2">Bonuses</h5>
                    <p className="mb-2"><Link href={`/tournament/${tournament.slug}/bonus`} className="underline">View all bonuses</Link></p>
                    <BonusCategoryTable
                        bonusCategoryStats={bonusCategoryStats}
                        mode="tournament"
                        slug={params.slug}
                    />
                </div>
            </div>
        </Layout>
    );
}
