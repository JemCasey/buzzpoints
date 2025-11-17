import Layout from "@/components/Layout";
import { getQuestionSetsQuery } from "@/utils/queries";
import QuestionSetSummary from "@/components/QuestionSetSummary";
import { QuestionSet } from "@/types";

export default function QuestionSetHome() {
    const questionSets: QuestionSet[] = getQuestionSetsQuery.all() as QuestionSet[];
    const questionSetFormats = questionSets.map(s => s.format);
    let summaryFormat = "acf";
    for (const f of ["powers", "superpowers"]) {
        if (questionSetFormats.includes(f)) {
            summaryFormat = f;
        }
    }

    return (
        <Layout>
            <h3 className="text-2xl font-bold my-5">Recent Question Sets</h3>
            <QuestionSetSummary
                questionSets={questionSets}
                format={summaryFormat}
                bonuses={questionSets.map(s => s.bonuses).some(v => v)}
            />
        </Layout>
    );
}
