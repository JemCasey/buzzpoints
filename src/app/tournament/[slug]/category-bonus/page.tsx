import Layout from "@/components/Layout";
import BonusCategoryTable from "@/components/BonusCategoryTable";
import { BonusCategory, Tournament } from "@/types";
import { getTournamentBySlug, getBonusCategoryStatsQuery, getTournamentsQuery } from "@/utils/queries";
import { Metadata } from "next";

export const generateStaticParams = () => {
    const tournaments: Tournament[] = getTournamentsQuery.all() as Tournament[];

    return tournaments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    let tournament = getTournamentBySlug(params.slug);

    return {
        title: `${tournament.name} Players - Buzzpoints App`,
        description: `Category leaderboard for ${tournament!.name}`,
    };
}

export default function CategoryTossupPage({ params }: { params: { slug: string, category: string } }) {
    const tournament = getTournamentBySlug(params.slug);
    const bonusCategoryStats = getBonusCategoryStatsQuery.all(tournament.id) as BonusCategory[];

    return <Layout tournament={tournament}>
        <BonusCategoryTable bonusCategoryStats={bonusCategoryStats}/>
    </Layout>
}
