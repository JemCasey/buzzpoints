import Layout from "@/components/Layout";
import { get, getBonusesByTournamentQuery, getTournamentBySlugQuery, getTournamentsQuery } from "@/utils/queries";
import { Bonus, Tournament } from "@/types";
import { BonusTable } from "@/components/common/BonusTable";
import { Metadata } from "next";

export async function generateStaticParams() {
    const tournaments = getTournamentsQuery.all() as Tournament[];

    return tournaments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    let tournament = get<Tournament>(getTournamentBySlugQuery, params.slug);

    return {
        title: `${tournament.name} Bonuses - Buzzpoints App`,
        description: `Bonus data for ${tournament!.name}`,
    };
}

export default function BonusesPage({ params }: { params: { slug: string } }) {
    const tournament = get<Tournament>(getTournamentBySlugQuery, params.slug);
    const bonuses = getBonusesByTournamentQuery.all(tournament!.id) as Bonus[];

    return (
        <Layout tournament={tournament}>
            <BonusTable bonuses={bonuses} />
        </Layout>
    );
}