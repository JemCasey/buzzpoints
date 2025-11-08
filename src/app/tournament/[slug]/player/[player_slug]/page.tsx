import Link from "next/link";
import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getTournamentBySlug, getPlayersByTournamentQuery, getPlayerCategoryStatsQuery, getTournamentsQuery, getTeamByPlayerAndTournamentQuery } from "@/utils/queries";
import { Tournament, Player, TossupConversion, } from "@/types";
import PlayerCategoryTable from "@/components/PlayerCategoryTable";

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

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    let tournament = getTournamentBySlug(params.slug);

    return {
        title: `${tournament.name} - Buzzpoints`,
        description: `Player category data for ${tournament!.name}`,
    };
}

export default async function PlayerPage(props: { params: Promise<{ slug: string, player_slug: string }> }) {
    const params = await props.params;
    const tournament = getTournamentBySlug(params.slug);
    const tossupPlayerCategoryStats = getPlayerCategoryStatsQuery.all(tournament.id, tournament.id, params.player_slug) as TossupConversion[];
    const player = getTeamByPlayerAndTournamentQuery.all(params.player_slug, tournament.id) as Player[];

    return (
        <Layout tournament={tournament}>
            <h3 className="text-xl text-center mb-3">
                <b>{player[0]?.name || 'N/A'}</b>
                <br></br>
                <Link href={`/tournament/${params.slug}/team/${player[0]?.team_slug}`} className="underline">
                    {player[0]?.team_name || 'N/A'}
                </Link>
            </h3>
            <div className="text-center mb-5">
                <Link href={`/set/${tournament.question_set.slug}/player/${params.player_slug}/buzz`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    View Buzzes
                </Link>
            </div>
            <PlayerCategoryTable
                categories={tossupPlayerCategoryStats}
                format={tournament.question_set.format}
            />
        </Layout>
    );
}
