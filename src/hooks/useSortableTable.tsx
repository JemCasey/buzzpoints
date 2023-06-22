import { Column } from "@/components/Table/index";
import { useState } from "react";
import * as _ from 'radash';

function sort(data:any[], sortField:string, sortOrder:string):any[] {
  if (sortField) {
    const sorted = [...data].sort((a, b) => {
      let valueOne = _.get(a, sortField) as any;
      let valueTwo = _.get(b, sortField) as any; 
      
      if (valueOne == null && valueTwo == null) return 0;
      if (valueOne == null) return sortOrder === "asc" ? 1 : -1;
      if (valueTwo == null) return sortOrder === "asc" ? -1 : 1;
      if (valueOne === valueTwo) return 0;

      return valueOne > valueTwo ? 1 : -1;
    });

    if (sortOrder === "desc")
      sorted.reverse();

    return sorted;
  } else {
    return data;
  }
}

export function getDefaultSorting(columns:Column[]) {
  let sortField = '', sortOrder = '';
  let sortColumn = columns.find(c => c.defaultSort);
  
  if (sortColumn) {
    sortField = sortColumn.sortKey || sortColumn.key;
    sortOrder = sortColumn.defaultSort!;
  } else if (columns.length) {
    sortField = columns[0].key;
    sortOrder = "asc";
  }

  return { sortField, sortOrder };
}

function performDefaultSort(data:any[], columns:Column[]) {
  let { sortField, sortOrder } = getDefaultSorting(columns);

  return sort(data, sortField, sortOrder);
}

export function useSortableTable(data:any[], columns:Column[]): [any[], (sortField: string, sortOrder: string) => void] {
  const [tableData, setTableData] = useState(performDefaultSort(data, columns));

  const handleSorting = (sortField:string, sortOrder:string) => {
    setTableData(sort(data, sortField, sortOrder));
  };

  return [tableData, handleSorting];
};