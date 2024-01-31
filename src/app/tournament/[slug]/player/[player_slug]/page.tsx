import PlayerCategoryTable from "@/components/PlayerCategoryTable";
import Layout from "@/components/Layout";
import { getTournamentBySlug, getPlayersByTournamentQuery, getPlayerCategoryStatsQuery, getTournamentsQuery } from "@/utils/queries";
import { Metadata } from "next";
import { Player, TossupConversion, Tournament } from "@/types";

export async function generateStaticParams() {
    const tournaments = getTournamentsQuery.all() as Tournament[];
    const paths = [];

    for (let { id, slug } of tournaments) {
        const players = getPlayersByTournamentQuery.all(id) as Player[];
        for (const { slug: player_slug } of players) {
            paths.push({
                slug,
                player_slug
            });
        }
    }

    return paths;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    let tournament = getTournamentBySlug(params.slug);

    return {
        title: `${tournament.name} - Buzzpoints App`,
        description: `Player category data for ${tournament!.name}`,
    };
}

export default function PlayerPage({ params }: { params: { slug: string, player_slug: string } }) {
    const tournament = getTournamentBySlug(params.slug);
    const tossupPlayerCategoryStats = getPlayerCategoryStatsQuery.all(tournament.id, tournament.id, params.player_slug) as TossupConversion[];

    return (
        <Layout tournament={tournament}>
            <h3 className="text-xl text-center mb-3"><b>{tossupPlayerCategoryStats[0]?.name || 'N/A'}</b></h3>
            <PlayerCategoryTable categories={tossupPlayerCategoryStats} />
        </Layout>
    );
}
