import BonusCategoryTable from "@/components/BonusCategoryTable";
import Layout from "@/components/Layout";
import { getTournamentBySlug, getTeamsByTournamentQuery, getTeamCategoryStatsQuery, getTournamentsQuery } from "@/utils/queries";
import { Metadata } from "next";
import { BonusCategory, Team, Tournament } from "@/types";

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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    let tournament = getTournamentBySlug(params.slug);

    return {
        title: `${tournament.name} - Buzzpoints App`,
        description: `Team category data for ${tournament!.name}`,
    };
}

export default function TeamPage({ params }: { params: { slug: string, team_slug: string } }) {
    const tournament = getTournamentBySlug(params.slug);
    const bonusTeamCategoryStats = getTeamCategoryStatsQuery.all(tournament.id, params.team_slug) as BonusCategory[];

    return (
        <Layout tournament={tournament}>
            <h3 className="text-xl text-center mb-3"><b>{bonusTeamCategoryStats[0]?.name || 'N/A'}</b></h3>
            <BonusCategoryTable bonusCategoryStats={bonusTeamCategoryStats} />
        </Layout>
    );
}
