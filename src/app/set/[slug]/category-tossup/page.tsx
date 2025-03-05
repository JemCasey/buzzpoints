import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getQuestionSetsQuery, getQuestionSetBySlug, getTossupCategoryStatsByQuestionSetQuery } from "@/utils/queries";
import { QuestionSet, TossupCategory, } from "@/types";
import TossupCategoryTable from "@/components/TossupCategoryTable";

export const generateStaticParams = () => {
    const questionSets: QuestionSet[] = getQuestionSetsQuery.all() as QuestionSet[];

    return questionSets.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    let questionSet = getQuestionSetBySlug(params.slug);

    return {
        title: `${questionSet.name} Players - Buzzpoints`,
        description: `Category leaderboard for ${questionSet!.name}`,
    };
}

export default async function CategoryTossupPage(props: { params: Promise<{ slug: string, category: string }> }) {
    const params = await props.params;
    const questionSet = getQuestionSetBySlug(params.slug);
    const tossupCategoryStats = getTossupCategoryStatsByQuestionSetQuery.all(questionSet!.id) as TossupCategory[];

    return <Layout questionSet={questionSet}>
        <TossupCategoryTable
            tossupCategoryStats={tossupCategoryStats}
            mode="set"
            slug={params.slug}
            format="powers"
        />
    </Layout>
}
