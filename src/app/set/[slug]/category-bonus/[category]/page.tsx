import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getQuestionSetsQuery, getCategoriesForQuestionSetQuery, getQuestionSetBySlug, getTeamCategoryForQuestionSetLeaderboard, getBonusesByQuestionSetQuery } from "@/utils/queries";
import { Bonus, BonusCategory, QuestionSet, } from "@/types";
import TeamCategoryTable from "@/components/TeamCategoryTable";

export const dynamicParams = false;

export async function generateStaticParams() {
    const questionSets: QuestionSet[] = getQuestionSetsQuery.all() as QuestionSet[];
    const paths = [];
    for (const questionSet of questionSets) {
        const bonuses = getBonusesByQuestionSetQuery.all(questionSet!.id) as Bonus[];
        if (bonuses.length > 0) {
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
    }

    return paths;
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    let questionSet = getQuestionSetBySlug(params.slug);

    return {
        title: `${questionSet.name} - Buzzpoints`,
        description: `Team category data for ${questionSet!.name}`,
    };
}

export default async function TeamPage(props: { params: Promise<{ slug: string, category: string }> }) {
    const params = await props.params;
    const questionSet = getQuestionSetBySlug(params.slug);
    const bonusTeamCategoryStats = getTeamCategoryForQuestionSetLeaderboard.all(questionSet.id, params.category) as BonusCategory[];

    return (
        <Layout questionSet={questionSet}>
            <h3 className="text-xl text-center mb-3"><b>{bonusTeamCategoryStats[0]?.category || "N/A"}</b></h3>
            <TeamCategoryTable bonusCategoryStats={bonusTeamCategoryStats} mode="set" />
        </Layout>
    );
}
