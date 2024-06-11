import React from "react";
import styles from "./DataGrid.module.scss";

interface Column {
   header: string;
   accessor: string;
   width?: string;
   textAlign?: "left" | "right" | "center";
}

interface TableHeaderProps {
   columns: Column[];
   columnWidths: string[];
   sortConfig: { key: string; direction: "asc" | "desc" } | null;
   handleSort: (accessor: string) => void;
   handleResizeMouseDown: (
      index: number,
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
   ) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
   columns,
   columnWidths,
   sortConfig,
   handleSort,
   handleResizeMouseDown,
}) => {
   return (
      <thead>
         <tr>
            {columns.map((column, index) => (
               <th
                  key={index}
                  style={{ width: columnWidths[index], textAlign: column.textAlign || "center" }}
                  className={styles.table_header_cell}
                  onClick={() => handleSort(column.accessor)}>
                  {column.header}
                  {sortConfig?.key === column.accessor && (
                     <span style={{ fontSize: "20px" }} className={styles.sortArrow}>
                        {sortConfig.direction === "asc" ? "▲" : "↴"}
                     </span>
                  )}
                  <div
                     className={styles.resize_handle}
                     onMouseDown={(e) => handleResizeMouseDown(index, e)}
                  />
               </th>
            ))}
         </tr>
      </thead>
   );
};
