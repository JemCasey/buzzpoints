import { Buzz, Tossup } from "@/types";
import Table from "../Table";
import { formatPercent } from "@/utils";

type TossupSummaryProps = {
    buzzes: Buzz[];
    tossup: Tossup;
}

export default function TossupSummary({ buzzes, tossup: { heard, average_buzz } }: TossupSummaryProps) {
    let columns = [
        { key: 'conversion_rate', label: 'Conv. %', format: formatPercent },
        { key: 'power_rate', label: 'Power %', format: formatPercent },
        { key: 'average_buzz', label: 'Avg. Buzz' }
    ];
    let correctBuzzes = buzzes.filter(b => b.value > 0).map(b => b.buzz_position);
    let items = [{
        conversion_rate: correctBuzzes.length / heard,
        power_rate: buzzes.filter(b => b.value > 10).length / heard,
        average_buzz
    }];

    return <div className="my-3">
        <Table columns={columns} data={items} noSort />
    </div>;
}