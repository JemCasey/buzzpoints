import { BuzzDictionary } from '@/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import * as _ from 'radash';

type TossupGraphProps = {
    buzzes: BuzzDictionary;
}

export default function TossupGraph({ buzzes }: TossupGraphProps) {
    let chartData = [];

    for (let buzz_position = 1; buzz_position <= _.max(Object.keys(buzzes).map(Number), b => b)!; buzz_position++) {
        let currCorrect: number = chartData[chartData.length - 1]?.correct || 0;
        let currIncorrect: number = chartData[chartData.length - 1]?.incorrect || 0;
        let newCorrect = 0;
        let newIncorrect = 0;

        for (let value of buzzes[buzz_position] || []) {
            newCorrect = value > 0 ? newCorrect + 1 : newCorrect;
            newIncorrect = value <= 0 ? newIncorrect + 1 : newIncorrect;
        }

        chartData.push({
            buzz_position,
            correct: currCorrect + newCorrect,
            incorrect: currIncorrect + newIncorrect
        });
    }

    return (
        <div className="mb-2 mt-2">
            <AreaChart
                width={500}
                height={200}
                data={chartData}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="buzz_position" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="correct" name="Correct Buzzes" stroke="#66ff6e" fill="#66ff6e" />
                <Area type="monotone" dataKey="incorrect" name="Incorrect Buzzes" stroke="#ff6666" fill="#ff6666" />
            </AreaChart>
        </div>
    );
}