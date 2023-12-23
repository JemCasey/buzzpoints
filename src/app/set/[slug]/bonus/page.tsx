import Layout from "@/components/Layout";
import { get, getBonusesByQuestionSetQuery, getQuestionSetBySlugQuery, getQuestionSetsQuery, } from "@/utils/queries";
import { Bonus, QuestionSet } from "@/types";
import { Metadata } from "next";
import { TournamentBonusTable } from "@/components/common/TournamentBonusTable";

export const generateStaticParams = () => {
    const questionSets: QuestionSet[] = getQuestionSetsQuery.all() as QuestionSet[];

    return questionSets.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    let questionSet = get<QuestionSet>(getQuestionSetBySlugQuery, params.slug);

    return {
        title: `${questionSet.name} Bonuses - Buzzpoints App`,
        description: `Bonus data for ${questionSet!.name}`,
    };
}
export default function BonusesPage({ params }: { params: { slug: string } }) {
    const questionSet = get<QuestionSet>(getQuestionSetBySlugQuery, params.slug);
    const bonuses = getBonusesByQuestionSetQuery.all(questionSet!.id) as Bonus[];

    return (
        <Layout questionSet={questionSet}>
            <TournamentBonusTable bonuses={bonuses} />
        </Layout>
    );
}