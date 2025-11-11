import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getQuestionSetsQuery, getQuestionSetBySlug, getTeamLeaderboardForQuestionSet } from "@/utils/queries";
import { QuestionSet, Tossup, } from "@/types";
import { TeamTable } from "@/components/common/TeamTable";

export const generateStaticParams = () => {
    const questionSets: QuestionSet[] = getQuestionSetsQuery.all() as QuestionSet[];

    return questionSets.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    let questionSet = getQuestionSetBySlug(params.slug);

    return {
        title: `${questionSet.name} Teams - Buzzpoints`,
        description: `Team data for ${questionSet!.name}`,
    };
}

export default async function TeamPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const questionSet = getQuestionSetBySlug(params.slug);
    const teams = getTeamLeaderboardForQuestionSet.all(questionSet!.id, questionSet!.id) as Tossup[];

    return <Layout questionSet={questionSet}>
        <TeamTable
            teams={teams}
            mode="set"
            slug={params.slug}
            format={questionSet.format}
            bonuses={questionSet.bonuses}
        />
    </Layout>
}
