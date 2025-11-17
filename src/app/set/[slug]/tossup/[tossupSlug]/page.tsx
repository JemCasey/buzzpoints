import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getAllBuzzesByTossupQuery, getQuestionSetsQuery, getTossupForSetDetailQuery, getTossupSummaryBySite, getTossupsByQuestionSetQuery, getQuestionSetBySlug, getQuestionSetBySlugQuery } from "@/utils/queries";
import { Buzz, QuestionSet, Tossup, TossupSummary } from "@/types";
import TossupDisplay from "@/components/TossupDisplay";

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

export async function generateMetadata(props: { params: Promise<{ slug:string, tossupSlug:string }>}): Promise<Metadata> {
    const params = await props.params;
    const questionSet = getQuestionSetBySlugQuery.get(params.slug) as QuestionSet;
    const tossup = getTossupForSetDetailQuery.get(questionSet.id, params.tossupSlug) as Tossup;

    return {
        title: `${tossup.answer_primary} - ${questionSet.name} - Buzzpoints`,
        description: `Tossup data for ${questionSet!.name}`,
    };
}

export default async function TossupPage(props: { params: Promise<{ slug:string, tossupSlug:string }>}) {
    const params = await props.params;
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
                    questionSet={questionSet}
                    tossupSummary={tossupSummary}
                />
            </Layout>
        </div>
    );
}
