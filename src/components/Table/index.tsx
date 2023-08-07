'use client';

import TableHead from "./TableHead";
import { useSortableTable } from "@/hooks/useSortableTable";
import { Tournament } from "@/types";
import * as _ from 'radash';

import Link from "next/link";

type Sort = "asc" | "desc";

export type CellRendererProps = {
  slug: string;
  cellValue: string
}

export type Column = {
  key: string;
  label: string;
  sortKey?: string;
  defaultSort?: Sort;
  defaultDescending?: boolean;
  linkTemplate?: string;
  html?: boolean;
  // can only be used if Table is in client-side component
  format?: (cellValue:any) => string;
  render?: (item:any) => React.ReactNode;
}

type TableProps = {
  columns: Column[];
  data: any[];
  tournament?: Tournament;
  noSort?: boolean;
  noHover?: boolean;
  compact?: boolean;
  rowProperties?: (item:any) => any;
}

export default function Table({ data, columns, noSort, noHover, compact, rowProperties }: TableProps) {
  const [tableData, handleSorting] = useSortableTable(data, columns);

  const renderCell = (item: any, column: Column) => {
    let cellValue = item[column.key];

    if (column.render)
      return column.render(item);  

    if (column.format)
      cellValue = column.format(cellValue);

    if (column.html)
      cellValue = <span dangerouslySetInnerHTML={{ __html: cellValue }}></span>;
    
    if (column.linkTemplate)
      return <Link href={_.template(column.linkTemplate, item)} className="underline">{cellValue}</Link>;

    return cellValue;
  }

  return (
    <div className="tableContainer">
      <table className={`table ${noSort ? "" : "sortableTable "}divide-y divide-gray-300`}>
        <TableHead {...{ columns, noSort, handleSorting, compact }} />
        <tbody>
          {tableData.map((item, i) => (
            <tr 
              key={item.id || i} 
              className={`${item.rowClass || ''} ${noHover ? "" : "row-hover"}`} 
              {...(rowProperties ? rowProperties(item) : {})}
            >
              {columns.map(column => (
                <td 
                  key={column.key}
                  className={`border-b border-gray-200${compact ? " compact" : ""}`}
                >
                  {renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};