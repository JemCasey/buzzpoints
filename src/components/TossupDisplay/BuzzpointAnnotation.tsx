import * as _ from 'radash';

type BuzzpointAnnotationProps = {
    children: React.ReactNode,
    buzzes: number[]
}

type BuzzCountDictionary = {
    [value:number]: number;
}

export default function BuzzpointAnnotation({ children, buzzes }:BuzzpointAnnotationProps) {
    if (!buzzes || !buzzes.length) {
        return <>{children}</>
    } else {
        let countMap:BuzzCountDictionary = buzzes.reduce((a, b) => {
            if (!a[b])
                a[b] = 1;
            else
                a[b]++;

            return a;
        }, {} as BuzzCountDictionary);

        let buzzCounts = _.sort(_.listify(countMap, (key, value) => ({ value: key, count: value})), c => c.value, true);

        return <ruby>
            <span>{children}</span>
            <rp>{"("}</rp>
            <rt>
                {buzzCounts.map(({ value, count }, i) =>
                    <span key={i} className={`value ${value > 0 ? 'get' : ''} ${value < 0 ? 'neg' : ''}`}>
                        <span>{value}</span>
                        <span style={{ marginLeft: '3px' }}>{`[${count}]`}</span>
                    </span>)
                }
            </rt>
            <rp>{")"}</rp>
        </ruby>
    }
}