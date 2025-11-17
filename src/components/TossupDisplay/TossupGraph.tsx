import { BuzzDictionary } from "@/types";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import * as _ from "radash";

type TossupGraphProps = {
    buzzes: BuzzDictionary;
    onHoverPositionChange?: (position: number | null) => void;
}

export default function TossupGraph({ buzzes, onHoverPositionChange }: TossupGraphProps) {
    let chartData = [];

    for (let buzz_position = 0; buzz_position <= _.max(Object.keys(buzzes).map(Number), b => b)!; buzz_position++) {
        let currCorrect: number = chartData[chartData.length - 1]?.correct || 0;
        let currNegs: number = chartData[chartData.length - 1]?.negs || 0;
        let currTotal: number = chartData[chartData.length - 1]?.total || 0;
        let newCorrect = 0;
        let newNegs = 0;
        let newTotal = 0;

        for (let value of buzzes[buzz_position] || []) {
            newCorrect = value > 0 ? newCorrect + 1 : newCorrect;
            newNegs = value < 0 ? newNegs + 1 : newNegs;
            newTotal++;
        }

        chartData.push({
            buzz_position,
            correct: currCorrect + newCorrect,
            total: currTotal + newTotal,
            negs: currNegs + newNegs
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
                    <Tooltip contentStyle={{ background: "white", color: "black", lineHeight: "130%", borderRadius: "5px", padding: "5px" }} />
                    <Legend />
                    <Area type="monotone" dataKey="total" name="Total" stroke="#808080" fill="#808080" />
                    <Area type="monotone" dataKey="correct" name="Correct" stroke="#29ba30" fill="#29ba30" />
                    {/* <Area type="monotone" dataKey="negs" name="Negs" stroke="#ca6363" fill="#ca6363" /> */}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
