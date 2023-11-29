import BonusCategoryTable from "@/components/BonusCategoryTable";
import Layout from "@/components/Layout";
import { get, getTeamsByTournamentQuery, getTeamCategoryStatsQuery, getTournamentBySlugQuery, getTournamentsQuery } from "@/utils/queries";
import { Metadata } from "next";
import { BonusCategory, Team, TossupConversion, Tournament } from "@/types";

export async function generateStaticParams() {
    const tournaments = getTournamentsQuery.all() as Tournament[];
    const paths = [];

    for (let { id, slug } of tournaments) {
        const teams = getTeamsByTournamentQuery.all(id) as Team[];
        for (const { name } of teams) {
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
        description: `Team category data for ${tournament!.name}`,
    };
}

export default function TeamPage({ params }: { params: { slug: string, name: string } }) {
    const tournament = get<Tournament>(getTournamentBySlugQuery, params.slug);
    const bonusTeamCategoryStats = getTeamCategoryStatsQuery.all(tournament.id, decodeURIComponent(params.name)) as BonusCategory[];

    return (
        <Layout tournament={tournament}>
            <h3 className="text-xl text-center mb-3"><b>{decodeURIComponent(params.name)}</b></h3>
            <BonusCategoryTable bonusCategoryStats={bonusTeamCategoryStats} />
        </Layout>
    );
}
