import React, { useRef, useEffect, useState } from "react";
import styles from "./DataGrid.module.scss";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { FilterRow } from "./FilterRow";
import { useColumnResizing, useFilters, useSort } from "./hooks";

interface Column {
   header: string;
   accessor: string;
   width?: string;
   textAlign?: "left" | "right" | "center";
   render?: (item: any) => React.ReactNode;
   visible?: boolean;
}

interface DataGridProps {
   data: any[];
   columns: Column[];
   enableFilters?: boolean;
   onRowSelect?: (selectedRow: any) => void;
   onDoubleClick?: (selectedRow: any) => void;
}

export default function DataGrid({
   data,
   columns,
   enableFilters = false,
   onRowSelect,
   onDoubleClick,
}: DataGridProps) {
   const visibleColumns = columns.filter((col) => col.visible !== false);
   const { columnWidths, handleResizeMouseDown } = useColumnResizing(visibleColumns);
   const { filters, handleFilterChange, filteredData } = useFilters(data, visibleColumns);
   const { sortConfig, handleSort, sortedData } = useSort(filteredData);
   const tableRef = useRef<HTMLTableElement>(null);
   const [tableHeight, setTableHeight] = useState<number>(0);

   useEffect(() => {
      if (tableRef.current) {
         setTableHeight(tableRef.current.offsetHeight);
      }
   }, [data, columns]);

   return (
      <div className={styles.data_grid_container}>
         {enableFilters && (
            <FilterRow
               columns={visibleColumns}
               filters={filters}
               onFilterChange={handleFilterChange}
            />
         )}
         <div className={styles.data_grid_wrapper}>
            <table className={styles.table} ref={tableRef}>
               <TableHeader
                  columns={visibleColumns}
                  columnWidths={columnWidths}
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                  handleResizeMouseDown={handleResizeMouseDown}
                  tableHeight={tableHeight}
               />
               <TableBody
                  data={sortedData}
                  columns={visibleColumns}
                  onRowSelect={onRowSelect}
                  onDoubleClick={onDoubleClick}
               />
            </table>
         </div>
      </div>
   );
}
