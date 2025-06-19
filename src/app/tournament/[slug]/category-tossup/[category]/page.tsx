import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getTournamentBySlug, getCategoriesForTournamentQuery, getPlayerCategoryLeaderboard, getTournamentsQuery } from "@/utils/queries";
import { Tournament, Tossup, } from "@/types";
import { PlayerTable } from "@/components/common/PlayerTable";

export async function generateStaticParams() {
    const tournaments = getTournamentsQuery.all() as Tournament[];
    const paths = [];
    for (const tournament of tournaments) {
        const categories = getCategoriesForTournamentQuery.all(tournament.id) as any[];
        for (const { category_slug } of categories) {
            if (category_slug) {
                paths.push({
                    slug: tournament.slug,
                    category: category_slug
                });
            }
        }
    }

    return paths;
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
    const players = getPlayerCategoryLeaderboard.all(tournament!.id, tournament!.id, params.category) as Tossup[];

    return <Layout tournament={tournament}>
        <h3 className="text-xl text-center mb-3"><b>{players[0]?.category || "N/A"}</b></h3>
        <PlayerTable
            players={players}
            mode="tournament"
            slug={params.slug}
            format="powers"
        />
        {/** TODO: don't hardcode format */}
    </Layout>
}
