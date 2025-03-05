import Link from "next/link";
import { Metadata } from "next";
import Layout from "@/components/Layout";
import { getQuestionSetsQuery, getPlayersByQuestionSetQuery, getQuestionSetBySlug, getPlayerCategoryStatsForQuestionSetQuery } from "@/utils/queries";
import { Player, QuestionSet, TossupConversion } from "@/types";
import PlayerCategoryTable from "@/components/PlayerCategoryTable";

export async function generateStaticParams() {
    const questionSets: QuestionSet[] = getQuestionSetsQuery.all() as QuestionSet[];
    const paths = [];

    for (let { id, slug } of questionSets) {
        const players = getPlayersByQuestionSetQuery.all(id) as Player[];
        for (const { slug: player_slug } of players) {
            paths.push({
                slug,
                player_slug
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
        description: `Player category data for ${questionSet!.name}`,
    };
}

export default async function PlayerPage(props: { params: Promise<{ slug: string, player_slug: string }> }) {
    const params = await props.params;
    const questionSet = getQuestionSetBySlug(params.slug);
    const tossupPlayerCategoryStats = getPlayerCategoryStatsForQuestionSetQuery.all(questionSet.id, questionSet.id, params.player_slug) as TossupConversion[];
    const player = (getPlayersByQuestionSetQuery.all(questionSet.id) as Player[]).filter((p) => p.slug === params.player_slug);

    return (
        <Layout questionSet={questionSet}>
            <h3 className="text-xl text-center mb-3">
                <b>{player[0]?.name || 'N/A'}</b>
                <br></br>
                <Link href={`/set/${params.slug}/team/${player[0]?.team_slug}`} className="underline">
                    {player[0]?.team_name || 'N/A'}
                </Link>
            </h3>
            <div className="text-center mb-5">
                <Link href={`/set/${params.slug}/player/${params.player_slug}/buzz`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    View Buzzes
                </Link>
            </div>
            <PlayerCategoryTable categories={tossupPlayerCategoryStats} format="powers" /> {/** TODO: don't hardcode format */}
        </Layout>
    );
}
