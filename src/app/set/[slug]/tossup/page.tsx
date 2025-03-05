import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getQuestionSetBySlugQuery, getQuestionSetsQuery, getTossupsByQuestionSetQuery, } from "@/utils/queries";
import { QuestionSet, Tossup, } from "@/types";
import { TossupTable } from "@/components/common/TossupTable";

export const generateStaticParams = () => {
    const questionSets: QuestionSet[] = getQuestionSetsQuery.all() as QuestionSet[];

    return questionSets.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    let questionSet = getQuestionSetBySlugQuery.get(params.slug) as QuestionSet;

    return {
        title: `${questionSet.name} Tossups - Buzzpoints`,
        description: `Tossup data for ${questionSet!.name}`,
    };
}

export default async function TossupPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const questionSet = getQuestionSetBySlugQuery.get(params.slug) as QuestionSet;
    const tossups = getTossupsByQuestionSetQuery.all(questionSet!.id) as Tossup[];

    return (
        <Layout questionSet={questionSet}>
            <TossupTable tossups={tossups} format="powers" />
        </Layout>
    );
}
