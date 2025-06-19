import Link from "next/link";
import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getTournamentBySlug, getTeamsByTournamentQuery, getTeamCategoryStatsQuery, getPlayersByTeamAndTournamentQuery, getTournamentsQuery } from "@/utils/queries";
import { Tournament, BonusCategory, Team, Player } from "@/types";
import BonusCategoryTable from "@/components/BonusCategoryTable";

export async function generateStaticParams() {
    const tournaments = getTournamentsQuery.all() as Tournament[];
    const paths = [];

    for (let { id, slug } of tournaments) {
        const teams = getTeamsByTournamentQuery.all(id) as Team[];
        for (const { slug: team_slug } of teams) {
            paths.push({
                slug,
                team_slug
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
        description: `Team category data for ${tournament!.name}`,
    };
}

export default async function TeamPage(props: { params: Promise<{ slug: string, team_slug: string }> }) {
    const params = await props.params;
    const tournament = getTournamentBySlug(params.slug);
    const bonusTeamCategoryStats = getTeamCategoryStatsQuery.all(tournament.id, params.team_slug) as BonusCategory[];
    const players = getPlayersByTeamAndTournamentQuery.all(params.team_slug, tournament.id) as Player[];

    const playerLinks = players.map((x, i, array) =>
        i === array.length - 1
        ?
        <><Link href={`/tournament/${params.slug}/player/${x?.slug}`} className="underline">{x.name}</Link></>
        :
        <><Link href={`/tournament/${params.slug}/player/${x?.slug}`} className="underline">{x.name}</Link> | </>
    );

    return (
        <Layout tournament={tournament}>
            <h3 className="text-xl text-center mb-3">
                <b>{players[0].team_name}</b>
                <br></br>
                {playerLinks}
            </h3>
            <BonusCategoryTable bonusCategoryStats={bonusTeamCategoryStats} mode="tournament" slug={params.slug} />
        </Layout>
    );
}
