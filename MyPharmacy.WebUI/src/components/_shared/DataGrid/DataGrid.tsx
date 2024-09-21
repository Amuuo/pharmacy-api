import { useRef, useState } from "react";
import type { ReactNode } from "react";
import styles from "./DataGrid.module.scss";
import TableHeader from "./sub-components/TableHeader";
import TableBody from "./sub-components/TableBody";
import FilterRow from "./sub-components/FilterRow";
import PaginationControls from "./sub-components/PaginationControls";
import { useColumnResizing } from "./hooks/useColumnResizing";
import { useFilters } from "./hooks/useFilters";
import { useSort } from "./hooks/useSort";
import { useRowNavigation } from "./hooks/useRowNavigation";

export interface Column {
  header: string;
  accessor: string;
  width?: string;
  textAlign?: "left" | "right" | "center";
  render?: (item: any) => ReactNode;
  visible?: boolean;
}

interface DataGridProps {
  data: any[];
  columns: Column[];
  enableFilters?: boolean;
  onRowSelect?: (selectedRow: any) => void;
  onDoubleClick?: (selectedRow: any) => void;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
  maxHeight?: number;
}

export default function DataGrid({
  data,
  columns,
  enableFilters = false,
  onRowSelect,
  onDoubleClick,
  pageNumber,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  maxHeight,
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
      <div className={styles.table_wrapper}>
        <div
          className={styles.table_container}
          style={{ maxHeight: maxHeight ? `${maxHeight}px` : "none" }}
        >
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
              columnWidths={[]}
            />
          </table>
        </div>
        <div className={styles.pagination_over_table}>
          <PaginationControls
            pageNumber={pageNumber}
            pageSize={pageSize}
            totalCount={totalCount}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      </div>
    </div>
  );
}
