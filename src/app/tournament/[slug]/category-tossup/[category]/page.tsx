import Layout from "@/components/Layout";
import { PlayerTable } from "@/components/common/PlayerTable";
import { Tossup, Tournament } from "@/types";
import { get, getPlayerCategoryLeaderboard, getTournamentBySlugQuery, getTournamentsQuery } from "@/utils/queries";
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
    const players = getPlayerCategoryLeaderboard.all(tournament!.id, tournament!.id, decodeURIComponent(params.category)) as Tossup[];

    return <Layout tournament={tournament}>
        <h3 className="text-xl text-center mb-3"><b>{decodeURIComponent(params.category)}</b></h3>
        <PlayerTable players={players} />
    </Layout>
}
