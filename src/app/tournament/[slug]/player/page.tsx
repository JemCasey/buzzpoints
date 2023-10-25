import Layout from "@/components/Layout";
import { PlayerTable } from "@/components/common/PlayerTable";
import { Tossup, Tournament } from "@/types";
import { get, getPlayerLeaderboardQuery, getTournamentBySlugQuery, getTournamentsQuery } from "@/utils/queries";
import { Metadata } from "next";

export const generateStaticParams = () => {
    const tournaments: Tournament[] = getTournamentsQuery.all() as Tournament[];

    return tournaments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    let tournament = get<Tournament>(getTournamentBySlugQuery, params.slug);

    return {
        title: `${tournament.name} Players - Buzzpoints App`,
        description: `Player data for ${tournament!.name}`,
    };
}

export default function PlayerPage({ params }: { params: { slug: string } }) {
    const tournament = get<Tournament>(getTournamentBySlugQuery, params.slug);
    const players = getPlayerLeaderboardQuery.all(tournament!.id, tournament!.id) as Tossup[];

    return <Layout tournament={tournament}>
        <PlayerTable players={players} />
    </Layout>
}