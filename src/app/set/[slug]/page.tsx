import Link from "next/link";
import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getQuestionSetBySlug, getQuestionSetsQuery, getBonusCategoryStatsForSetQuery, getTossupCategoryStatsForSetQuery } from "@/utils/queries";
import { QuestionSet, BonusCategory, TossupCategory } from "@/types";
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
    const questionSet = getQuestionSetBySlug(params.slug) as QuestionSet;
    const tossupCategoryStats = getTossupCategoryStatsForSetQuery.all(questionSet.id) as TossupCategory[];
    const bonusCategoryStats = getBonusCategoryStatsForSetQuery.all(questionSet.id) as BonusCategory[];

    return (
        <Layout questionSet={questionSet}>
            <QuestionSetSummary
                questionSets={[questionSet]}
                detailPage={true}
                format={questionSet.format}
                bonuses={questionSet.bonuses}
            />
            <div className="flex flex-col md:flex-row md:space-x-10 mt-5">
                <div className="md:basis-1/2">
                    <h5 className="text-lg font-bold my-2"><Link href={`/set/${questionSet.slug}/tossup`} className="underline">Tossups</Link></h5>
                    <TossupCategoryTable
                        tossupCategoryStats={tossupCategoryStats}
                        mode="set"
                        slug={params.slug}
                        format={questionSet.format}
                    />
                </div>
                {!!questionSet.bonuses &&
                    <div className="md:basis-1/2">
                        <h5 className="text-lg font-bold my-2"><Link href={`/set/${questionSet.slug}/bonus`} className="underline">Bonuses</Link></h5>
                        <BonusCategoryTable
                            bonusCategoryStats={bonusCategoryStats}
                            mode="set"
                            slug={params.slug}
                        />
                    </div>
                }
            </div>
        </Layout>
    );
}
