import Layout from "@/components/Layout";
import { getBonusesByTournamentQuery, getTournamentBySlugQuery, getTournamentsQuery } from "@/utils/queries";
import { Bonus, Tournament } from "@/types";
import { BonusTable } from "@/components/common/BonusTable";
import { Metadata } from "next";

export async function generateStaticParams() {
    const tournaments = getTournamentsQuery.all() as Tournament[];

    return tournaments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    let tournament = getTournamentBySlugQuery.get(params.slug) as Tournament;

    return {
        title: `${tournament.name} Bonuses - Buzzpoints App`,
        description: `Bonus data for ${tournament!.name}`,
    };
}

export default function BonusesPage({ params }: { params: { slug: string } }) {
    const tournament = getTournamentBySlugQuery.get(params.slug) as Tournament;
    const bonuses = getBonusesByTournamentQuery.all(tournament!.id) as Bonus[];

    return (
        <Layout tournament={tournament}>
            <BonusTable bonuses={bonuses} />
        </Layout>
    );
}