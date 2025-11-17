import { Round } from "@/types";

export const slugify = (text: string) => text.replaceAll(" ", "-").replace(/\W/g, "").toLowerCase().trim();
export const sanitize = (text: string) => text.replace(/ *\([^)]*\)/g, "").trim();
export const shortenAnswerline = (answerline: string) => removeBadPunc(answerline.split("[")[0].replace(/ *\([^)]*\)/g, "")).trim();
export const removeTags = (text: string) => removeBadPunc(text.replace(/(<([^>]+)>)/ig, ""));
export const removeBadPunc = (text: string) => text.replaceAll(/\&nbsp;/g, " ").replaceAll(/\&amp;/g, "\&");

export const formatPercent = (v: any) => v?.toLocaleString("en-US", { style: "percent" });
export const formatDecimal = (v: any) => v?.toFixed(2);

export const getNavOptions = function (round: number, number: number, tournamentRounds: Round[]) {
    let prev = tournamentRounds[tournamentRounds.findIndex(r => r.number === round) - 1];
    let next = tournamentRounds[tournamentRounds.findIndex(r => r.number === round) + 1];

    return {
        previous: (prev || number > 1) ? {
            round: number > 1 ? round : prev!.number,
            number: number > 1 ? number - 1 : 20
        } : null,
        next: (next || number < 20) ? {
            round: number < 20 ? round : next!.number,
            number: number < 20 ? number + 1 : 1
        } : null
    }
}
