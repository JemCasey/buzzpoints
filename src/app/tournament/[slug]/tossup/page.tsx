import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getTournamentBySlug, getTossupsByTournamentQuery, getTournamentsQuery } from "@/utils/queries";
import { Tossup, Tournament } from "@/types";
import { TournamentTossupTable } from "@/components/common/TournamentTossupTable";

export const generateStaticParams = () => {
    const tournaments: Tournament[] = getTournamentsQuery.all() as Tournament[];

    return tournaments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    let tournament = getTournamentBySlug(params.slug);

    return {
        title: `${tournament.name} Tossups - Buzzpoints`,
        description: `Tossup data for ${tournament!.name}`,
    };
}

export default async function TossupPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const tournament = getTournamentBySlug(params.slug);
    const tossups = getTossupsByTournamentQuery.all(tournament!.id) as Tossup[];

    return <Layout tournament={tournament}>
        <TournamentTossupTable tossups={tossups} format="powers" />
    </Layout>
}
