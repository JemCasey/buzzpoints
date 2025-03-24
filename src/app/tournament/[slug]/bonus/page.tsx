import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getTournamentBySlug, getBonusesByTournamentQuery, getTournamentsQuery } from "@/utils/queries";
import { Bonus, Tournament } from "@/types";
import { TournamentBonusTable } from "@/components/common/TournamentBonusTable";

export async function generateStaticParams() {
    const tournaments = getTournamentsQuery.all() as Tournament[];

    return tournaments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    let tournament = getTournamentBySlug(params.slug);

    return {
        title: `${tournament.name} Bonuses - Buzzpoints`,
        description: `Bonus data for ${tournament!.name}`,
    };
}

export default async function BonusesPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const tournament = getTournamentBySlug(params.slug);
    const bonuses = getBonusesByTournamentQuery.all(tournament!.id) as Bonus[];

    return (
        <Layout tournament={tournament}>
            <TournamentBonusTable bonuses={bonuses} />
        </Layout>
    );
}
