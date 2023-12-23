import { Tournament, QuestionSet } from "@/types";
import Navbar from "./Navbar";

type LayoutProps = {
    tournament?: Tournament;
    questionSet?: QuestionSet;
    children: React.ReactNode;
}

export default function Layout({ tournament, questionSet, children }: LayoutProps) {
    return <main>
        <Navbar tournament={tournament} questionSet={questionSet} />
        <div className="container mx-auto ps-5 pe-5 md:ps-20 md:pe-20 mt-3">
            {children}
        </div>
    </main>
}