import { removeTags, sanitize } from "@/utils";
import TossupWord from "./TossupWord";
import { BuzzDictionary, Tossup, Word } from "@/types";

type TossupText = {
    tossup: Tossup;
    buzzes: BuzzDictionary;
    hoverPosition: number | null;
    averageBuzz: number | null | undefined;
    buzzpoint: number | null;
    onBuzzpointChange: (buzzpoint:number) => void;
}

export default function TossupText({ tossup: { question, answer, metadata }, buzzes, hoverPosition, averageBuzz, buzzpoint, onBuzzpointChange }: TossupText) {
    // keywords--for now just the the powermark--shouldn't render as clickable words
    const keywords = ["(*)", "[*]", "{*}"];
    const getWords = (question:string) => {
        let emphasis = false;
        let bold = false;
        let pg = false;
        let powerbreak = false;

        let words = question.replaceAll('&nbsp;', ' ').split(' ').reduce((prev, curr) => {
            let word = removeTags(curr).replace(/^\W*/, '').replace(/\W*$/g, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            if (curr.match(`<em>.*${word}`))
                emphasis = true;
            else if (curr.match(`<b>.*${word}`))
                bold = true;
            else if (curr.match(`</em>.*${word}`))
                emphasis = false;
            else if (curr.match(`</b>.*${word}`))
                bold = false;

            if (curr.match(/\([“"]/)) {
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
                    hoverPosition={hoverPosition}
                    onBuzzpointChange={onBuzzpointChange}
                    averageBuzz={averageBuzz}
                />
            )}
        </p>
        <div>ANSWER: <span dangerouslySetInnerHTML={{ __html: answer }}></span></div>
        {metadata && <div>{"<" + metadata + ">"}</div>}
        <div className="text-xs relative mt-2 mb-2">
            <span className="average-buzz-line" style={{height: '100%'}}></span>
            <span className="ms-2"> = Average correct buzz position</span>
        </div>
    </>
}