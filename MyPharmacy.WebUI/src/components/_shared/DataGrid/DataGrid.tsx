import React, { useRef, useEffect, useState, useCallback } from "react";
import styles from "./DataGrid.module.scss";
import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";
import { FilterRow } from "./components/FilterRow";
import { useColumnResizing } from "./hooks/useColumnResizing";
import { useFilters } from "./hooks/useFilters";
import { useSort } from "./hooks/useSort";
import { useRowNavigation } from "./hooks/useRowNavigation";

export interface Column {
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
   const { filters, handleFilterChange, filteredData } = useFilters(data);
   const { sortConfig, handleSort, sortedData } = useSort(filteredData);
   const tableRef = useRef<HTMLTableElement>(null);
   const [selectedRow, setSelectedRow] = useState<number | null>(null);

   useRowNavigation({
      selectedRow,
      setSelectedRow,
      sortedData,
      onRowSelect,
      tableRef,
   });

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
                  tableHeight={tableRef.current?.clientHeight || 0}
               />
               <TableBody
                  data={sortedData}
                  columns={visibleColumns}
                  onRowSelect={onRowSelect}
                  onDoubleClick={onDoubleClick}
                  selectedRow={selectedRow}
                  setSelectedRow={setSelectedRow}
               />
            </table>
         </div>
      </div>
   );
}
