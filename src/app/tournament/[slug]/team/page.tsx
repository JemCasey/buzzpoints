import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getTournamentBySlug, getTeamLeaderboard, getTournamentsQuery } from "@/utils/queries";
import { Tournament, Tossup, } from "@/types";
import { TeamTable } from "@/components/common/TeamTable";

export const generateStaticParams = () => {
    const tournaments: Tournament[] = getTournamentsQuery.all() as Tournament[];

    return tournaments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    let tournament = getTournamentBySlug(params.slug);

    return {
        title: `${tournament.name} Teams - Buzzpoints`,
        description: `Team data for ${tournament!.name}`,
    };
}

export default async function TeamPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const tournament = getTournamentBySlug(params.slug);
    const teams = getTeamLeaderboard.all(tournament!.id, tournament!.id) as Tossup[];

    return <Layout tournament={tournament}>
        <TeamTable
            teams={teams}
            mode="tournament"
            slug={params.slug}
            format={tournament.question_set.format}
            bonuses={tournament.question_set.bonuses}
        />
    </Layout>
}
