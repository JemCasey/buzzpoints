import BonusDisplay from "@/components/BonusDisplay";
import Layout from "@/components/Layout";
import { Bonus, BonusDirect, BonusPart, BonusSummary, QuestionSet } from "@/types";
import { removeTags, shortenAnswerline } from "@/utils";
import { getDirectsByBonusQuery, getBonusesByQuestionSetQuery, getQuestionSetsQuery, getBonusPartsBySlugQuery, getBonusSummaryBySite, getQuestionSetBySlugQuery } from "@/utils/queries";
import { Metadata } from "next";

export const generateStaticParams = () => {
    const questionSets: QuestionSet[] = getQuestionSetsQuery.all() as QuestionSet[];
    const paths = [];

    for (let { id, slug } of questionSets) {
        const bonuses: Bonus[] = getBonusesByQuestionSetQuery.all(id) as Bonus[];

        for (let { slug: bonusSlug } of bonuses) {
            paths.push({
                slug,
                bonusSlug
            });
        }
    }

    return paths;
}

export async function generateMetadata({ params }: { params: { slug:string, bonusSlug:string }}): Promise<Metadata> {
    const questionSet = getQuestionSetBySlugQuery.get(params.slug) as QuestionSet;
    const bonusParts = getBonusPartsBySlugQuery.all(questionSet.id, params.bonusSlug) as BonusPart[];
    
    return {
        title: `${removeTags(shortenAnswerline(bonusParts[0].answer))} - ${questionSet.name} - Buzzpoints App`,
        description: `Bonus data for ${questionSet!.name}`,
    };
}

export default function BonusPage({ params }: { params: { slug:string, bonusSlug:string }}) {
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

    return (
        <Layout questionSet={questionSet}>
            <BonusDisplay 
                parts={parts} 
                directs={directs} 
                questionSet={questionSet} 
                bonusSummary={bonusSummary}
            />
        </Layout>
    );
}