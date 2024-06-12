import React, { useState } from "react";
import styles from "../DataGrid.module.scss";

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
   tableHeight: number;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
   columns,
   columnWidths,
   sortConfig,
   handleSort,
   handleResizeMouseDown,
   tableHeight,
}) => {
   const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
   const [disablePointerEvents, setDisablePointerEvents] = useState(false);

   return (
      <thead>
         <tr>
            {columns.map((column, index) => (
               <th
                  key={index}
                  style={{ width: columnWidths[index], textAlign: column.textAlign || "center" }}
                  className={`${hoveredColumn === index ? styles.highlight_border : ""} ${
                     disablePointerEvents ? styles.noPointerEvents : ""
                  } ${styles.table_header_cell} ${styles.glassEffect}`}
                  onClick={() => handleSort(column.accessor)}>
                  {column.header}
                  {sortConfig?.key === column.accessor && (
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
            ))}
         </tr>
      </thead>
   );
};
