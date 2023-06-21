import { removeTags, sanitize } from "@/utils";
import TossupWord from "./TossupWord";
import { BuzzDictionary, Tossup, Word } from "@/types";

type TossupText = {
    tossup: Tossup;
    buzzes: BuzzDictionary;
    buzzpoint: number | null;
    setBuzzpoint: (buzzpoint:number) => void;
}

export default function TossupText({ tossup: { question, answer }, buzzes, buzzpoint, setBuzzpoint }: TossupText) {
    // keywords--for now just the the powermark--shouldn't render as clickable words
    const keywords = ["(*)"];
    let getWords = (question:string) => {
        let emphasis = false;
        let bold = true;
        let pg = false;
        let powerbreak = false;

        let words = question.replaceAll('&nbsp;', ' ').split(' ').reduce((prev, curr) => {
            let word = removeTags(curr).replace(/\W/g, '');

            if (curr.match(`<em>.*${word}`))
                emphasis = true;
            else if (curr.match(`<b>.*${word}`))
                bold = true;
            else if (curr.match(`</em>.*${word}`))
                emphasis = false;
            else if (curr.match(`</b>.*${word}`))
                bold = false;

            if (curr.match(/\(“|"/)) {
                pg = true;
            }

            if (keywords.includes(removeTags(curr))) {
                prev.keywords.push({
                    text: removeTags(curr),
                    emphasis,
                    bold
                });
            } else {
                if (!pg && !powerbreak) {
                    let { pgText } = prev;
    
                    prev.words.push({
                        text: removeTags(curr),
                        emphasis,
                        bold,
                        pgText: pgText.join(' '),
                        keywords: prev.keywords
                    });
    
                    prev.pgText = [];
                    prev.keywords = [];
                } else {
                    prev.pgText.push(removeTags(curr));
                }
            }

            if (curr.match(/”|"\)/)) {
                pg = false;
            }

            if (curr.match(`${word}.*</em>`))
                emphasis = false;
            if (curr.match(`${word}.*<\/b>`))
                bold = false;
            if (curr.match(`${word}.*<em>`))
                emphasis = true;
            if (curr.match(`${word}.*<b>`))
                bold = true;

            return prev;
        }, {
            words: [] as Word[],
            pgText: [] as string[],
            keywords: [] as Word[]
        }).words;

        words.push({
            text: '■END■'
        });

        return words;
    };

    let words = getWords(question);

    return <>
        <p style={{ marginBottom: '0.1em' }}>
            {words.map((w, i) =>
                <TossupWord word={w}
                    index={i}
                    key={i}
                    buzzes={buzzes[i]}
                    buzzpoint={buzzpoint}
                    setBuzzpoint={setBuzzpoint}
                />
            )}
        </p>
        <div>ANSWER: <span dangerouslySetInnerHTML={{ __html: answer }}></span></div>
    </>
}