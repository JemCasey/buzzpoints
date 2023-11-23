import Layout from "@/components/Layout";
import { TeamTable } from "@/components/common/TeamTable";
import { Tossup, Tournament } from "@/types";
import { get, getTeamLeaderboard, getTournamentBySlugQuery, getTournamentsQuery } from "@/utils/queries";
import { Metadata } from "next";

export const generateStaticParams = () => {
    const tournaments: Tournament[] = getTournamentsQuery.all() as Tournament[];

    return tournaments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    let tournament = get<Tournament>(getTournamentBySlugQuery, params.slug);

    return {
        title: `${tournament.name} Teams - Buzzpoints App`,
        description: `Team data for ${tournament!.name}`,
    };
}

export default function TeamPage({ params }: { params: { slug: string } }) {
    const tournament = get<Tournament>(getTournamentBySlugQuery, params.slug);
    const teams = getTeamLeaderboard.all(tournament!.id, tournament!.id) as Tossup[];

    return <Layout tournament={tournament}>
        <TeamTable teams={teams} />
    </Layout>
}
