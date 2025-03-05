import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getQuestionSetsQuery, getQuestionSetBySlug, getBonusCategoryStatsForQuestionSetQuery } from "@/utils/queries";
import { BonusCategory, QuestionSet } from "@/types";
import BonusCategoryTable from "@/components/BonusCategoryTable";

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

export default async function CategoryBonusPage(props: { params: Promise<{ slug: string, category: string }> }) {
    const params = await props.params;
    const questionSet = getQuestionSetBySlug(params.slug);
    const bonusCategoryStats = getBonusCategoryStatsForQuestionSetQuery.all(questionSet.id) as BonusCategory[];

    return <Layout questionSet={questionSet}>
        <BonusCategoryTable bonusCategoryStats={bonusCategoryStats} mode="set" slug={params.slug} />
    </Layout>
}
