import Link from "next/link";
import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getPlayersByTeamAndTournamentQuery, getQuestionSetsQuery, getTeamsByQuestionSetQuery, getQuestionSetBySlug,getBonusPartsDirectsByTeamQuery } from "@/utils/queries";
import { BonusCategory, Team, Tournament, Player, QuestionSet, BonusPart, BonusDirect, Bonus } from "@/types";
import TeamBonusTable from "@/components/common/TeamBonusTable";

export async function generateStaticParams() {
    const questionSets = getQuestionSetsQuery.all() as QuestionSet[];
    const paths = [];

    for (let { id, slug } of questionSets) {
        const teams = getTeamsByQuestionSetQuery.all(id) as Team[];
        for (const { slug: team_slug } of teams) {
            paths.push({
                slug,
                team_slug
            });
        }
    }

    return paths;
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    let questionSet = getQuestionSetBySlug(params.slug);

    return {
        title: `${questionSet.name} - Buzzpoints`,
        description: `Team bonus data for ${questionSet!.name}`,
    };
}

export default async function TeamPage(props: { params: Promise<{ slug: string, team_slug: string }> }) {
    const params = await props.params;
    const questionSet = getQuestionSetBySlug(params.slug);
    const teamTournament = (getTeamsByQuestionSetQuery.all(questionSet.id) as Team[]).find((t) => t.slug === params.team_slug) as Team;
    const players = getPlayersByTeamAndTournamentQuery.all(params.team_slug, teamTournament?.tournament_id) as Player[];
    const bonus = getBonusPartsDirectsByTeamQuery.all(
        teamTournament?.tournament_id,
        teamTournament?.id,
    ) as Bonus[];

    const playerLinks = players.map((x, i, array) =>
        i === array.length - 1
        ?
        <span key={i}><Link href={`/set/${params.slug}/player/${x?.slug}`} className="underline">{x.name}</Link></span>
        :
        <span key={i}><Link href={`/set/${params.slug}/player/${x?.slug}`} className="underline">{x.name}</Link> | </span>
    );

    return (
        <Layout questionSet={questionSet}>
            <h3 className="text-xl text-center mb-3">
                <b>{teamTournament?.name}</b> (<Link href={`/tournament/${teamTournament?.tournament_slug}`} className="underline">{teamTournament?.tournament_name}</Link>)
                <br></br>
                {playerLinks}
            </h3>
            <div className="text-center mb-5">
                <Link href={`/set/${params.slug}/team/${params.team_slug}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    View Categories
                </Link>
            </div>
            {!!questionSet.bonuses &&
                <TeamBonusTable
                    bonus={bonus!}
                    mode="set"
                    slug={params.slug}
                />
            }
        </Layout>
    );
}
