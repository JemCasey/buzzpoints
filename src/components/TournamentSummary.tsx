import { Tournament } from "@/types";
import Table from "./Table";

type TournamentSummaryProps = {
    tournament: Tournament
}

export default function TournamentSummary({ tournament }: TournamentSummaryProps) {
    const startDate = new Date(tournament.start_date).toLocaleDateString("en-US");
    const endDate = tournament.end_date ? new Date(tournament.end_date).toLocaleDateString("en-US") : "";
    const columns = [
        {
            key: "name",
            label: "Tournament"
        },
        {
            key: "date",
            label: "Date"
        },
        {
            key: "level",
            label: "Level"
        },
        {
            key: "location",
            label: "Location"
        }, 
        {
            key: "set",
            label: "Set"
        }, 
        {
            key: "difficulty",
            label: "Difficulty"
        }
    ];
    
    const data = [
        {
            name: tournament.name,
            date: startDate + (endDate && endDate !== startDate ? ` - ${endDate}` : ''),
            level: tournament.level,
            location: tournament.location,
            set: tournament.question_set.name,
            difficulty: tournament.question_set.difficulty
        }
    ];

    return <Table columns={columns} data={data} noSort noHover />;
}