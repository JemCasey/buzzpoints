import Layout from "@/components/Layout";
import { TossupTable } from "@/components/common/TossupTable";
import { Tossup, Tournament } from "@/types";
import { getTournamentBySlug, getTossupsByTournamentQuery, getTournamentsQuery } from "@/utils/queries";
import { Metadata } from "next";

export const generateStaticParams = () => {
    const tournaments: Tournament[] = getTournamentsQuery.all() as Tournament[];

    return tournaments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    let tournament = getTournamentBySlug(params.slug);

    return {
        title: `${tournament.name} Tossups - Buzzpoints App`,
        description: `Tossup data for ${tournament!.name}`,
    };
}

export default function TossupPage({ params }: { params: { slug: string } }) {
    const tournament = getTournamentBySlug(params.slug);
    const tossups = getTossupsByTournamentQuery.all(tournament!.id) as Tossup[];

    return <Layout tournament={tournament}>
        <TossupTable tossups={tossups} />
    </Layout>
}