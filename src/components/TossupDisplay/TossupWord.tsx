import { Word } from "@/types";
import BuzzpointAnnotation from "./BuzzpointAnnotation";

type TossupWordProps = {
    word: Word;
    index: number;
    buzzes: number[];
    buzzpoint: number | null;
    setBuzzpoint: (buzzpoint:number) => void;
}

export default function TossupWord({ word, index, buzzes, buzzpoint, setBuzzpoint }:TossupWordProps) {
    let hasBuzzes = buzzes && buzzes.length;
    let renderWord = (word:Word) => {
        let markup = word.emphasis ? <em>{word.text}</em> : word.text;

        if (word.bold)
            markup = <b>{markup}</b>;

        return markup;
    };

    return <span>
        {word.keywords?.map((keyword, i) => (
            <span key={i}>{renderWord(keyword)}{' '}</span>
        ))}
        {!!word.pgText && <span className="pronunciation-guide">{word.pgText} </span>}
        <BuzzpointAnnotation buzzes={buzzes}>
            <span
                className={`${buzzpoint === index ? 'highlighted-word' : ''} ${hasBuzzes ? 'buzzpoint-word' : ''}`}
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