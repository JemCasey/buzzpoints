import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getQuestionSetsQuery, getCategoriesForQuestionSetQuery, getQuestionSetBySlug, getPlayerCategoryForQuestionSetLeaderboard } from "@/utils/queries";
import { QuestionSet, Tossup, } from "@/types";
import { PlayerTable } from "@/components/common/PlayerTable";

export async function generateStaticParams() {
    const questionSets: QuestionSet[] = getQuestionSetsQuery.all() as QuestionSet[];
    const paths = [];
    for (const questionSet of questionSets) {
        const categories = getCategoriesForQuestionSetQuery.all(questionSet.id) as any[];
        for (const { category_slug } of categories) {
            if (category_slug) {
                paths.push({
                    slug: questionSet.slug,
                    category: category_slug
                });
            }
        }
    }

    return paths;
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
    const players = getPlayerCategoryForQuestionSetLeaderboard.all(questionSet!.id, questionSet!.id, params.category) as Tossup[];

    return <Layout questionSet={questionSet}>
        <h3 className="text-xl text-center mb-3"><b>{players[0]?.category || "N/A"}</b></h3>
        <PlayerTable
            players={players}
            mode="set"
            slug={params.slug}
            format={questionSet.format}
        />
    </Layout>
}
