import { Word } from "@/types";
import BuzzpointAnnotation from "./BuzzpointAnnotation";

type TossupWordProps = {
    word: Word;
    index: number;
    buzzes: number[];
    hoverPosition: number | null;
    averageBuzz: number | null | undefined;
    buzzpoint: number | null;
    onBuzzpointChange: (buzzpoint:number) => void;
}

export default function TossupWord({ word, index, buzzes, hoverPosition, buzzpoint, averageBuzz, onBuzzpointChange: setBuzzpoint }:TossupWordProps) {
    let hasBuzzes = buzzes && buzzes.length;
    let hasAverageBuzzpoint = !!averageBuzz && Math.floor(averageBuzz) === index;
    let renderWord = (word:Word) => {
        let markup = word.emphasis ? <em>{word.text}</em> : word.text;

        if (word.bold)
            markup = <b>{markup}</b>;

        return markup;
    };

    return <span className={hasAverageBuzzpoint ? "relative" : ""}>
        {word.keywords?.map((keyword, i) => (
            <span key={i}>{renderWord(keyword)}{' '}</span>
        ))}
        {!!word.pgText && <span className="pronunciation-guide">{word.pgText} </span>}
        <BuzzpointAnnotation buzzes={buzzes}>
            {hasAverageBuzzpoint && 
                <span 
                    className="average-buzz-line" 
                    style={{
                        left: `calc(100% * ${averageBuzz! % 1})`
                    }}
                >
            </span>}
            <span
                className={`${hoverPosition === index ? 'chart-hover-word' : ''} ${buzzpoint === index ? 'highlighted-word' : ''} ${hasBuzzes ? 'buzzpoint-word' : ''}`}
                onClick={() => {
                    if (hasBuzzes)
                        setBuzzpoint(index);
                }}
            >
                {renderWord(word)}
            </span>{' '}
        </BuzzpointAnnotation>
    </span>;
}