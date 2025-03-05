import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getTournamentBySlug, getCategoriesForTournamentQuery, getTeamCategoryLeaderboard, getTournamentsQuery } from "@/utils/queries";
import { BonusCategory, Tournament } from "@/types";
import TeamCategoryTable from "@/components/TeamCategoryTable";

export async function generateStaticParams() {
    const tournaments = getTournamentsQuery.all() as Tournament[];
    const paths = [];
    for (const tournament of tournaments) {
        const categories = getCategoriesForTournamentQuery.all(tournament.id) as any[];
        for (const { category_slug } of categories) {
            if (category_slug) {
                paths.push({
                    slug: tournament.slug,
                    category: category_slug
                });
            }
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

export default async function TeamPage(props: { params: Promise<{ slug: string, category: string }> }) {
    const params = await props.params;
    const tournament = getTournamentBySlug(params.slug);
    const bonusTeamCategoryStats = getTeamCategoryLeaderboard.all(tournament.id, params.category) as BonusCategory[];

    return (
        <Layout tournament={tournament}>
            <h3 className="text-xl text-center mb-3"><b>{bonusTeamCategoryStats[0]?.category || "N/A"}</b></h3>
            <TeamCategoryTable bonusCategoryStats={bonusTeamCategoryStats} />
        </Layout>
    );
}
