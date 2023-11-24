import Layout from "@/components/Layout";
import TossupCategoryTable from "@/components/TossupCategoryTable";
import { TossupCategory, Tournament } from "@/types";
import { get, getTossupCategoryStatsQuery, getTournamentBySlugQuery, getTournamentsQuery } from "@/utils/queries";
import { Metadata } from "next";

export const generateStaticParams = () => {
    const tournaments: Tournament[] = getTournamentsQuery.all() as Tournament[];

    return tournaments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    let tournament = get<Tournament>(getTournamentBySlugQuery, params.slug);

    return {
        title: `${tournament.name} Players - Buzzpoints App`,
        description: `Category leaderboard for ${tournament!.name}`,
    };
}

export default function CategoryTossupPage({ params }: { params: { slug: string, category: string } }) {
    const tournament = get<Tournament>(getTournamentBySlugQuery, params.slug);
    const tossupCategoryStats = getTossupCategoryStatsQuery.all(tournament!.id) as TossupCategory[];

    return <Layout tournament={tournament}>
        <TossupCategoryTable tossupCategoryStats={tossupCategoryStats} />
    </Layout>
}
