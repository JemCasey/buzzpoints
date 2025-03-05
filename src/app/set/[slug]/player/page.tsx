import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getQuestionSetsQuery, getQuestionSetBySlug, getPlayerLeaderboardForQuestionSet } from "@/utils/queries";
import { QuestionSet, Tossup, } from "@/types";
import { PlayerTable } from "@/components/common/PlayerTable";

export const generateStaticParams = () => {
    const questionSets: QuestionSet[] = getQuestionSetsQuery.all() as QuestionSet[];

    return questionSets.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    let questionSet = getQuestionSetBySlug(params.slug);

    return {
        title: `${questionSet.name} Players - Buzzpoints`,
        description: `Player data for ${questionSet!.name}`,
    };
}

export default async function PlayerPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const questionSet = getQuestionSetBySlug(params.slug);
    const players = getPlayerLeaderboardForQuestionSet.all(questionSet!.id, questionSet!.id) as Tossup[];

    return <Layout questionSet={questionSet}>
        <PlayerTable
            players={players}
            mode="set"
            slug={params.slug}
            format="powers"
        />
        {/** TODO: don't hardcode format */}
    </Layout>
}
