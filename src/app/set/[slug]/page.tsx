import Link from "next/link";
import TossupCategoryTable from "@/components/TossupCategoryTable";
import Layout from "@/components/Layout";
import { getQuestionSetBySlug, getBonusCategoryStatsForSetQuery, getQuestionSetsQuery, getTossupCategoryStatsForSetQuery } from "@/utils/queries";
import { Metadata } from "next";
import { BonusCategory, QuestionSet, TossupCategory, Tournament } from "@/types";
import BonusCategoryTable from "@/components/BonusCategoryTable";
import QuestionSetSummary from "@/components/QuestionSetSummary";

export async function generateStaticParams() {
    const questionSets = getQuestionSetsQuery.all() as QuestionSet[];

    return questionSets.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const questionSet = getQuestionSetBySlug(params.slug);

    return {
        title: `${questionSet.name} - Buzzpoints App`,
        description: `Category conversion data for question set ${questionSet!.name}`,
    };
}

export default function QuestionSet({ params }: { params: { slug: string } }) {
  const questionSet = getQuestionSetBySlug(params.slug);
  const tossupCategoryStats = getTossupCategoryStatsForSetQuery.all(questionSet.id) as TossupCategory[];
  const bonusCategoryStats = getBonusCategoryStatsForSetQuery.all(questionSet.id) as BonusCategory[];

    return (
        <Layout questionSet={questionSet}>
            <QuestionSetSummary
                questionSets={[questionSet]}
                detailPage={true}
            />
            <div className="flex flex-col md:flex-row md:space-x-10 mt-5">
                <div className="md:basis-1/2">
                    <h5 className="text-lg font-bold my-2">Tossups</h5>
                    <p className="mb-2"><Link href={`/set/${questionSet.slug}/tossup`} className="underline">View all tossups</Link></p>
                    <TossupCategoryTable tossupCategoryStats={tossupCategoryStats} categoryLinks={false} />
                </div>
                <div className="md:basis-1/2">
                    <h5 className="text-lg font-bold my-2">Bonuses</h5>
                    <p className="mb-2"><Link href={`/set/${questionSet.slug}/bonus`} className="underline">View all bonuses</Link></p>
                    <BonusCategoryTable bonusCategoryStats={bonusCategoryStats} categoryLinks={false} />
                </div>
            </div>
        </Layout>
    );
}