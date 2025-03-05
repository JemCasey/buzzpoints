import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getTournamentBySlug, getBonusCategoryStatsQuery, getTournamentsQuery } from "@/utils/queries";
import { BonusCategory, Tournament } from "@/types";
import BonusCategoryTable from "@/components/BonusCategoryTable";

export const generateStaticParams = () => {
    const tournaments: Tournament[] = getTournamentsQuery.all() as Tournament[];

    return tournaments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    let tournament = getTournamentBySlug(params.slug);

    return {
        title: `${tournament.name} Players - Buzzpoints`,
        description: `Category leaderboard for ${tournament!.name}`,
    };
}

export default async function CategoryBonusPage(props: { params: Promise<{ slug: string, category: string }> }) {
    const params = await props.params;
    const tournament = getTournamentBySlug(params.slug);
    const bonusCategoryStats = getBonusCategoryStatsQuery.all(tournament.id) as BonusCategory[];

    return <Layout tournament={tournament}>
        <BonusCategoryTable
            bonusCategoryStats={bonusCategoryStats}
            mode="tournament"
            slug={params.slug}
        />
    </Layout>
}
