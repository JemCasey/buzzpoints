import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getTournamentBySlug, getTossupCategoryStatsQuery, getTournamentsQuery } from "@/utils/queries";
import { Tournament, TossupCategory, } from "@/types";
import TossupCategoryTable from "@/components/TossupCategoryTable";

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

export default async function CategoryTossupPage(props: { params: Promise<{ slug: string, category: string }> }) {
    const params = await props.params;
    const tournament = getTournamentBySlug(params.slug);
    const tossupCategoryStats = getTossupCategoryStatsQuery.all(tournament!.id) as TossupCategory[];

    return <Layout tournament={tournament}>
        <TossupCategoryTable
            tossupCategoryStats={tossupCategoryStats}
            mode="tournament"
            slug={params.slug}
            format={tournament.question_set.format}
        />
    </Layout>
}
