import Layout from "@/components/Layout";
import { getAllBuzzesByTossupQuery, getQuestionSetsQuery, getTossupForSetDetailQuery, getTossupSummaryBySite, getTossupsByQuestionSetQuery, getQuestionSetBySlug, getQuestionSetBySlugQuery } from "@/utils/queries";
import { Buzz, QuestionSet, Tossup, TossupSummary } from "@/types";
import TossupDisplay from "@/components/TossupDisplay";
import { Metadata } from "next";

export const generateStaticParams = () => {
    const questionSets: QuestionSet[] = getQuestionSetsQuery.all() as QuestionSet[];
    const paths = [];

    for (let { id, slug } of questionSets) {
        const tossups: Tossup[] = getTossupsByQuestionSetQuery.all(id) as Tossup[];

        for (let { slug: tossupSlug } of tossups) {
            paths.push({
                slug,
                tossupSlug
            });
        }
    }

    return paths;
}

export async function generateMetadata({ params }: { params: { slug:string, tossupSlug:string }}): Promise<Metadata> {
    const questionSet = getQuestionSetBySlugQuery.get(params.slug) as QuestionSet;
    const tossup = getTossupForSetDetailQuery.get(questionSet.id, params.tossupSlug) as Tossup;

    return {
        title: `${tossup.answer_primary} - ${questionSet.name} - Buzzpoints App`,
        description: `Tossup data for ${questionSet!.name}`,
    };
}

export default function TossupPage({ params }: { params: { slug:string, tossupSlug:string }}) {
    const questionSet = getQuestionSetBySlugQuery.get(params.slug) as QuestionSet;
    const tossup = getTossupForSetDetailQuery.get(questionSet.id, params.tossupSlug) as Tossup;
    const buzzes = getAllBuzzesByTossupQuery.all(tossup.id) as Buzz[];
    const tossupSummary = getTossupSummaryBySite.all({
        tossupId: tossup.id, 
        questionSetId: questionSet.id, 
        metadata: tossup.metadata, 
        answerPrimary: tossup.answer_primary, 
        question: tossup.question
    }) as TossupSummary[];

    return (
        <div>
            <Layout questionSet={questionSet}>
                <TossupDisplay 
                    tossup={tossup} 
                    buzzes={buzzes} 
                    tossupSummary={tossupSummary}
                />
            </Layout>
        </div>
    );
}