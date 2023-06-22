import { BonusPart } from "@/types";

type BonusTextProps = {
    parts: BonusPart[]
}

export default function BonusText({ parts }: BonusTextProps) {
    return <>
        <div dangerouslySetInnerHTML={{ __html: parts[0].leadin }} />
        {
            parts.map(({ id, value, difficulty_modifier, answer, part }) => {
                return (
                    <div key={id}>
                        <div>{`[${value}${difficulty_modifier}] `}<span dangerouslySetInnerHTML={{ __html: part }}></span></div>
                        <div>ANSWER: <span dangerouslySetInnerHTML={{ __html: answer }}></span></div>
                    </div>
                );
            })
        }
    </>
}