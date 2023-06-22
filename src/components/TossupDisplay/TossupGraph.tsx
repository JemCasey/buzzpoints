import { BuzzDictionary } from '@/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as _ from 'radash';

type TossupGraphProps = {
    buzzes: BuzzDictionary;
    onHoverPositionChange?: (position: number | null) => void;
}

export default function TossupGraph({ buzzes, onHoverPositionChange }: TossupGraphProps) {
    let chartData = [];

    for (let buzz_position = 1; buzz_position <= _.max(Object.keys(buzzes).map(Number), b => b)!; buzz_position++) {
        let currCorrect: number = chartData[chartData.length - 1]?.correct || 0;
        let currTotal: number = chartData[chartData.length - 1]?.total || 0;
        let newCorrect = 0;
        let newTotal = 0;

        for (let value of buzzes[buzz_position] || []) {
            newCorrect = value > 0 ? newCorrect + 1 : newCorrect;
            newTotal++;
        }

        chartData.push({
            buzz_position,
            correct: currCorrect + newCorrect,
            total: currTotal + newTotal
        });
    }

    return (
        <div className="mb-3 mt-3">
            <ResponsiveContainer
                height={200}
                width="100%"
            >
                <AreaChart
                    data={chartData}
                    onMouseMove={(state) => {
                        if (onHoverPositionChange) {
                            let xAxisPayload = state?.activePayload ? state.activePayload[1] : null;
                            
                            onHoverPositionChange(xAxisPayload?.payload?.buzz_position ?? null);
                        }
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="buzz_position" interval={10} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="total" name="Total Buzzes" stroke="#808080" fill="#808080" />
                    <Area type="monotone" dataKey="correct" name="Correct Buzzes" stroke="#33ff3d" fill="#33ff3d" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}