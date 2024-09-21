import { useState } from "react";
import styles from "./TableHeader.module.scss";

function TableHeader({
   columns,
   columnWidths,
   sortConfig,
   handleSort,
   handleResizeMouseDown,
   tableHeight,
}: TableHeaderProps) {
   const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

   return (
      <thead>
         <tr>
            {columns.map((column, index) => {
               const isSorted = sortConfig?.key === column.accessor;
               const isHovered = hoveredColumn === index;
               const thClassName = [
                  styles.table_header_cell,
                  styles.glassEffect,
                  isHovered && styles.highlight_border,
               ]
                  .filter(Boolean)
                  .join(" ");

               return (
                  <th
                     key={column.accessor}
                     style={{ width: columnWidths[index], textAlign: column.textAlign || "center" }}
                     className={thClassName}
                     onClick={() => handleSort(column.accessor)}>
                     {column.header}
                     {isSorted && (
                        <span style={{ fontSize: "10px", position: "absolute", right: 10 }}>
                           {sortConfig.direction === "asc" ? "▲" : "▼"}
                        </span>
                     )}
                     <div
                        className={styles.resize_handle}
                        style={{ height: `${tableHeight}px` }}
                        onMouseDown={(e) => handleResizeMouseDown(index, e)}
                        onMouseEnter={() => setHoveredColumn(index)}
                        onMouseLeave={() => setHoveredColumn(null)}
                     />
                  </th>
               );
            })}
         </tr>
      </thead>
   );
}

export default TableHeader;

interface Column {
   header: string;
   accessor: string;
   width?: string;
   textAlign?: "left" | "right" | "center";
}

interface SortConfig {
   key: string;
   direction: "asc" | "desc";
}

interface TableHeaderProps {
   columns: Column[];
   columnWidths: string[];
   sortConfig: SortConfig | null;
   handleSort: (accessor: string) => void;
   handleResizeMouseDown: (
      index: number,
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
   ) => void;
   tableHeight: number;
}
