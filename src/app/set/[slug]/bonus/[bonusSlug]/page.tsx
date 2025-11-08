import Layout from "@/components/Layout";
import { Metadata } from "next";
import { getDirectsByBonusQuery, getBonusesByQuestionSetQuery, getQuestionSetsQuery, getBonusPartsBySlugQuery, getBonusSummaryBySite, getQuestionSetBySlugQuery } from "@/utils/queries";
import { Bonus, BonusDirect, BonusPart, BonusSummary, QuestionSet } from "@/types";
import { removeTags, shortenAnswerline } from "@/utils";
import BonusDisplay from "@/components/BonusDisplay";

export const dynamicParams = false;

export async function generateStaticParams() {
    const questionSets: QuestionSet[] = getQuestionSetsQuery.all() as QuestionSet[];
    const paths = [];
    for (let { id, slug } of questionSets) {
        const bonuses: Bonus[] = getBonusesByQuestionSetQuery.all(id) as Bonus[];
        if (bonuses.length > 0) {
            for (let { slug: bonusSlug } of bonuses) {
                paths.push({
                    slug,
                    bonusSlug
                });
            }
        }
    }

    return paths;
}

export async function generateMetadata(props: { params: Promise<{ slug: string, bonusSlug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const questionSet = getQuestionSetBySlugQuery.get(params.slug) as QuestionSet;
    const bonusParts = getBonusPartsBySlugQuery.all(questionSet.id, params.bonusSlug) as BonusPart[];

    return {
        title: `${removeTags(shortenAnswerline(bonusParts[0].answer))} - ${questionSet.name} - Buzzpoints`,
        description: `Bonus data for ${questionSet!.name}`,
    };
}

export default async function BonusPage(props: { params: Promise<{ slug: string, bonusSlug: string }> }) {
    const params = await props.params;
    const questionSet = getQuestionSetBySlugQuery.get(params.slug) as QuestionSet;
    const parts = getBonusPartsBySlugQuery.all(questionSet.id, params.bonusSlug) as BonusPart[];
    const directs = getDirectsByBonusQuery.all({
        bonusId: parts[0].id,
        tournamentId: null
    }) as BonusDirect[];
    const bonusSummary = getBonusSummaryBySite.all({
        bonusId: parts[0].id,
        questionSetId: questionSet.id,
    }) as BonusSummary[];
    const bonus = (getBonusesByQuestionSetQuery.all(questionSet!.id) as Bonus[]).find((b) => b.id == parts[0].id);

    return (
        <Layout questionSet={questionSet}>
            <BonusDisplay
                bonus={bonus!}
                parts={parts}
                directs={directs}
                questionSet={questionSet}
                bonusSummary={bonusSummary}
            />
        </Layout>
    );
}
