import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getBonusesByQuestionSetQuery, getQuestionSetsQuery, getQuestionSetBySlugQuery, } from "@/utils/queries";
import { Bonus, QuestionSet } from "@/types";
import { BonusTable } from "@/components/common/BonusTable";

export const dynamicParams = false;

export async function generateStaticParams() {
    const questionSets: QuestionSet[] = (getQuestionSetsQuery.all() as QuestionSet[]).filter(s => {
        const bonuses = getBonusesByQuestionSetQuery.all(s!.id) as Bonus[];
        return (bonuses.length > 0);
    }) as QuestionSet[];

    return questionSets.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const questionSet = getQuestionSetBySlugQuery.get(params.slug) as QuestionSet;

    return {
        title: `${questionSet.name} Bonuses - Buzzpoints`,
        description: `Bonus data for ${questionSet!.name}`,
    };
}

export default async function BonusesPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const questionSet = getQuestionSetBySlugQuery.get(params.slug) as QuestionSet;
    const bonuses = getBonusesByQuestionSetQuery.all(questionSet!.id) as Bonus[];

    return (
        <Layout questionSet={questionSet}>
            <BonusTable bonuses={bonuses} mode="full" />
        </Layout>
    );
}
