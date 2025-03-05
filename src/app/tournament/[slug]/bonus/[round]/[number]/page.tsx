import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getTournamentBySlug, all, getBonusesByTournamentQuery, getTournamentsQuery, getBonusPartsQuery, getDirectsByBonusQuery, getRoundsForTournamentQuery, getBonusSummaryBySite, getBonusesByQuestionSetQuery } from "@/utils/queries";
import { Bonus, BonusDirect, BonusPart, BonusSummary, Round, Tournament } from "@/types";
import { getNavOptions, removeTags, shortenAnswerline } from "@/utils";
import BonusDisplay from "@/components/BonusDisplay";

export const generateStaticParams = () => {
    const tournaments = all<Tournament[]>(getTournamentsQuery);
    const paths = [];

    for (let { id, slug } of tournaments) {
        const bonuses = getBonusesByTournamentQuery.all(id) as Bonus[];

        for (let { round, question_number } of bonuses) {
            paths.push({
                slug,
                round: String(round),
                number: String(question_number)
            });
        }
    }

    return paths;
}

export async function generateMetadata(props: { params: Promise<{ slug: string, round: string, number: string }>}): Promise<Metadata> {
    const params = await props.params;
    const tournament = getTournamentBySlug(params.slug);
    const bonusParts = getBonusPartsQuery.all(tournament.id, params.round, params.number) as BonusPart[];

    return {
        title: `${removeTags(shortenAnswerline(bonusParts[0].answer))} - ${tournament.name} - Buzzpoints`,
        description: `Bonus data for ${tournament!.name}`,
    };
}

export default async function BonusPage(props: { params: Promise<{ slug: string, round: string, number: string }>}) {
    const params = await props.params;
    const tournament = getTournamentBySlug(params.slug);
    const parts = getBonusPartsQuery.all(tournament.id, params.round, params.number) as BonusPart[];
    const directs = getDirectsByBonusQuery.all({
        bonusId: parts[0].id,
        tournamentId: tournament.id
    }) as BonusDirect[];
    const tournamentRounds = getRoundsForTournamentQuery.all(tournament.id) as Round[];
    const navOptions = getNavOptions(parseInt(params.round), parseInt(params.number), tournamentRounds);
    const bonusSummary = getBonusSummaryBySite.all({
        bonusId: parts[0].id,
        questionSetId: tournament.question_set_id,
    }) as BonusSummary[];
    const bonus = (getBonusesByQuestionSetQuery.all(tournament.question_set_id) as Bonus[]).find((b) => b.id == parts[0].id);

    return (
        <Layout tournament={tournament}>
            <BonusDisplay
                bonus={bonus!}
                parts={parts}
                directs={directs}
                tournament={tournament}
                navOptions={navOptions}
                bonusSummary={bonusSummary}
            />
        </Layout>
    );
}
