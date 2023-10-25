import Layout from "@/components/Layout";
import { BuzzTable } from "@/components/common/BuzzTable";
import { Player, Tossup, Tournament } from "@/types";
import { get, getPlayerBuzzes, getPlayerBySlugQuery, getPlayerLeaderboardQuery, getTournamentBySlugQuery, getTournamentsQuery } from "@/utils/queries";
import { Metadata } from "next";

export const generateStaticParams = () => {
    const paths = [];
    const tournaments: Tournament[] = getTournamentsQuery.all() as Tournament[];

    for (let { id, slug } of tournaments) {
        const players = getPlayerLeaderboardQuery.all(id, id) as any[];

        for (let { player_slug: playerSlug } of players)
            paths.push({ slug, playerSlug });
    }

    return paths;
}

export async function generateMetadata({ params }: { params: { playerSlug: string } }): Promise<Metadata> {
    let player = get<Player>(getPlayerBySlugQuery, params.playerSlug);

    return {
        title: `${player.name} - Buzzpoints App`,
        description: `Data for ${player!.name}`,
    };
}

export default function PlayerPage({ params }: { params: { slug: string, playerSlug: string } }) {
    const tournament = get<Tournament>(getTournamentBySlugQuery, params.slug);
    const player = get<Player>(getPlayerBySlugQuery, params.playerSlug);
    const buzzes = getPlayerBuzzes.all(tournament!.id, params.playerSlug) as Tossup[];

    return <Layout tournament={tournament}>
        <h1 className="mb-4 text-2xl font-bold">{player.name}</h1>
        <BuzzTable buzzes={buzzes} />
    </Layout>
}