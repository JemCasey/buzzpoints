import { Tournament } from "@/types";
import Navbar from "./Navbar";

type LayoutProps = {
    tournament?: Tournament;
    children: React.ReactNode;
}

export default function Layout({ tournament, children }: LayoutProps) {
    return <main>
        <Navbar tournament={tournament} />
        <div className="container mx-auto ps-5 pe-5 md:ps-20 md:pe-20">
            {children}
        </div>
    </main>
}