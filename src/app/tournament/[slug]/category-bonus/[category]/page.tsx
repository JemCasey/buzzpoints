import TeamCategoryTable from "@/components/TeamCategoryTable";
import Layout from "@/components/Layout";
import { get, getCategoriesForTournamentQuery, getTeamCategoryLeaderboard, getTournamentBySlugQuery, getTournamentsQuery } from "@/utils/queries";
import { Metadata } from "next";
import { BonusCategory, Team, TossupConversion, Tournament } from "@/types";

export async function generateStaticParams() {
    const tournaments = getTournamentsQuery.all() as Tournament[];
    const paths = [];
    for (const tournament of tournaments) {
        const categories = getCategoriesForTournamentQuery.all(tournament.id) as string[];
        for (const category of categories) {
            paths.push({
                slug: tournament.slug,
                category: encodeURIComponent(category)
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

export default function TeamPage({ params }: { params: { slug: string, category: string } }) {
    const tournament = get<Tournament>(getTournamentBySlugQuery, params.slug);
    const bonusTeamCategoryStats = getTeamCategoryLeaderboard.all(tournament.id, decodeURIComponent(params.category), decodeURIComponent(params.category)) as BonusCategory[];

    return (
        <Layout tournament={tournament}>
            <h3 className="text-xl text-center mb-3"><b>{decodeURIComponent(params.category)}</b></h3>
            <TeamCategoryTable bonusCategoryStats={bonusTeamCategoryStats} />
        </Layout>
    );
}
