import Link from "next/link";
import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getQuestionSetBySlug, getBonusCategoryStatsForSetQuery, getQuestionSetsQuery, getTossupCategoryStatsForSetQuery } from "@/utils/queries";
import { BonusCategory, QuestionSet, TossupCategory } from "@/types";
import TossupCategoryTable from "@/components/TossupCategoryTable";
import BonusCategoryTable from "@/components/BonusCategoryTable";
import QuestionSetSummary from "@/components/QuestionSetSummary";

export async function generateStaticParams() {
    const questionSets = getQuestionSetsQuery.all() as QuestionSet[];

    return questionSets.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const questionSet = getQuestionSetBySlug(params.slug);

    return {
        title: `${questionSet.name} - Buzzpoints`,
        description: `Category conversion data for ${questionSet!.name}`,
    };
}

export default async function QuestionSetFunc(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const questionSet = getQuestionSetBySlug(params.slug);
    const tossupCategoryStats = getTossupCategoryStatsForSetQuery.all(questionSet.id) as TossupCategory[];
    const bonusCategoryStats = getBonusCategoryStatsForSetQuery.all(questionSet.id) as BonusCategory[];

    return (
        <Layout questionSet={questionSet}>
            <QuestionSetSummary
                questionSets={[questionSet]}
                detailPage={true}
                format="powers"
            />
            <div className="flex flex-col md:flex-row md:space-x-10 mt-5">
                <div className="md:basis-1/2">
                    <h5 className="text-lg font-bold my-2">Tossups</h5>
                    <p className="mb-2"><Link href={`/set/${questionSet.slug}/tossup`} className="underline">View all tossups</Link></p>
                    <TossupCategoryTable
                        tossupCategoryStats={tossupCategoryStats}
                        categoryLinks={false}
                        mode="set"
                        slug={params.slug}
                        format="powers"
                    />
                </div>
                <div className="md:basis-1/2">
                    <h5 className="text-lg font-bold my-2">Bonuses</h5>
                    <p className="mb-2"><Link href={`/set/${questionSet.slug}/bonus`} className="underline">View all bonuses</Link></p>
                    <BonusCategoryTable
                        bonusCategoryStats={bonusCategoryStats}
                        categoryLinks={false}
                        mode="set"
                        slug={params.slug}
                    />
                </div>
            </div>
        </Layout>
    );
}
