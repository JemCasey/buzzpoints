import { useState } from "react";
import { Column } from "../Table";
import { getDefaultSorting } from "@/hooks/useSortableTable";

type TableHeadProps = {
    columns: Column[];
    noSort?: boolean;
    handleSorting: Function;
    compact?: boolean;
}

const TableHead = ({ columns, handleSorting, noSort, compact }: TableHeadProps) => {
    const defaultSort = getDefaultSorting(columns);
    const [sortField, setSortField] = useState(defaultSort.sortField);
    const [sortOrder, setSortOrder] = useState(defaultSort.sortOrder);

    const handleSortingChange = (key:string, defaultDescending:boolean | undefined) => {
        let order = key === sortField && sortOrder === "asc" ? "desc" : "asc";
        
        if (key !== sortField && defaultDescending)
            order = "desc";
        
        setSortField(key);
        setSortOrder(order);
        handleSorting(key, order);
    };
    
    return (
        <thead>
            <tr className={compact ? " compact" : ""}>
                {columns.map(({ label, key, sortKey, defaultDescending }) => {
                    const sortId = sortKey || key;
                    const cl = sortField === sortId && sortOrder === "asc" ? "up" : sortField === sortId && sortOrder === "desc" ? "down" : "default";
                    
                    return (
                        <th
                            key={key}
                            onClick={() => {
                                if (!noSort) handleSortingChange(sortId, defaultDescending)
                            }}
                            className={cl}
                        >
                            {label}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default TableHead;