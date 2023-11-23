import PlayerCategoryTable from "@/components/PlayerCategoryTable";
import Layout from "@/components/Layout";
import { get, getPlayersByTournamentQuery, getPlayerCategoryStatsQuery, getTournamentBySlugQuery, getTournamentsQuery } from "@/utils/queries";
import { Metadata } from "next";
import { Player, TossupConversion, Tournament } from "@/types";

export async function generateStaticParams() {
    const tournaments = getTournamentsQuery.all() as Tournament[];
    const paths = [];

    for (let { id, slug } of tournaments) {
        const players = getPlayersByTournamentQuery.all(id) as Player[];
        for (const { name } of players) {
            paths.push({
                slug,
                name: encodeURIComponent(name)
            });
        }
    }

    return paths;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    let tournament = get<Tournament>(getTournamentBySlugQuery, params.slug);

    return {
        title: `${tournament.name} - Buzzpoints App`,
        description: `Player category data for ${tournament!.name}`,
    };
}

export default function PlayerPage({ params }: { params: { slug: string, name: string } }) {
    const tournament = get<Tournament>(getTournamentBySlugQuery, params.slug);
    const tossupPlayerCategoryStats = getPlayerCategoryStatsQuery.all(tournament.id, tournament.id, decodeURIComponent(params.name)) as TossupConversion[];

    return (
        <Layout tournament={tournament}>
            <h3 className="text-xl text-center mb-3"><b>{decodeURIComponent(params.name)}</b></h3>
            <PlayerCategoryTable categories={tossupPlayerCategoryStats} />
        </Layout>
    );
}
