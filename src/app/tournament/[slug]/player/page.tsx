import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getTournamentBySlug, getPlayerLeaderboard, getTournamentsQuery } from "@/utils/queries";
import { Tossup, Tournament } from "@/types";
import { PlayerTable } from "@/components/common/PlayerTable";

export const generateStaticParams = () => {
    const tournaments: Tournament[] = getTournamentsQuery.all() as Tournament[];

    return tournaments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    let tournament = getTournamentBySlug(params.slug);

    return {
        title: `${tournament.name} Players - Buzzpoints`,
        description: `Player data for ${tournament!.name}`,
    };
}

export default async function PlayerPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const tournament = getTournamentBySlug(params.slug);
    const players = getPlayerLeaderboard.all(tournament!.id, tournament!.id) as Tossup[];

    return <Layout tournament={tournament}>
        <PlayerTable
            players={players}
            mode="tournament"
            slug={params.slug}
            format={tournament.question_set.format}
        />
    </Layout>
}
