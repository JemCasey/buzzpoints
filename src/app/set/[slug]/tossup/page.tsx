import Layout from "@/components/Layout";
import { TournamentTossupTable } from "@/components/common/TournamentTossupTable";
import { QuestionSet, Tossup, Tournament } from "@/types";
import { get, getQuestionSetBySlugQuery, getQuestionSetsQuery, getTossupsByQuestionSetQuery, getTossupsByTournamentQuery, getTournamentBySlugQuery, getTournamentsQuery } from "@/utils/queries";
import { Metadata } from "next";

export const generateStaticParams = () => {
    const questionSets: QuestionSet[] = getQuestionSetsQuery.all() as QuestionSet[];

    return questionSets.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    let questionSet = get<QuestionSet>(getQuestionSetBySlugQuery, params.slug);

    return {
        title: `${questionSet.name} Tossups - Buzzpoints App`,
        description: `Tossup data for ${questionSet!.name}`,
    };
}

export default function TossupPage({ params }: { params: { slug: string } }) {
    const questionSet = get<QuestionSet>(getQuestionSetBySlugQuery, params.slug);
    const tossups = getTossupsByQuestionSetQuery.all(questionSet!.id) as Tossup[];

    return (
        <Layout questionSet={questionSet}>
            <TournamentTossupTable tossups={tossups} />
        </Layout>
    );
}