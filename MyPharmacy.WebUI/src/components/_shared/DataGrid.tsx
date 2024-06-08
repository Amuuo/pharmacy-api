import { useState, useRef, useEffect, useMemo } from "react";
import styles from "./DataGrid.module.scss";
import * as React from "react";
import { usePharmacyStore } from "../../stores/pharmacyStoreTest";

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
}

export default function DataGrid({ data, columns }: DataGridProps) {
   const visibleColumns = columns.filter((col) => col.visible !== false);
   const [columnWidths, setColumnWidths] = useState(
      visibleColumns.map((col) => col.width || "auto"),
   );
   const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
   const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(
      null,
   );
   const [filters, setFilters] = useState<{ [key: string]: string }>({});
   const resizingColumn = useRef<number | null>(null);
   const startWidth = useRef<number>(0);
   const startX = useRef<number>(0);
   const tableRef = useRef<HTMLTableElement>(null);
   const [tableHeight, setTableHeight] = useState<number>(0);
   const [disablePointerEvents, setDisablePointerEvents] = useState(false);
   const { setPharmacySelection } = usePharmacyStore();

   useEffect(() => {
      if (tableRef.current) {
         setTableHeight(tableRef.current.offsetHeight);
      }
   }, [data, columns]);

   const handleResizeMouseDown = (
      index: number,
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
   ) => {
      event.preventDefault();
      event.stopPropagation();
      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";

      const columnHeader = event.currentTarget.parentElement;
      startWidth.current = columnHeader ? columnHeader.offsetWidth : 0;
      startX.current = event.clientX;
      resizingColumn.current = index;

      const onMouseMove = (moveEvent: MouseEvent) => {
         const movementX = moveEvent.clientX - startX.current;
         const newWidth = Math.max(startWidth.current + movementX, 0);

         setColumnWidths((prevWidths) => {
            const newWidths = [...prevWidths];
            newWidths[resizingColumn.current as number] = `${newWidth}px`;
            return newWidths;
         });
      };

      const onResizeMouseUp = () => {
         document.removeEventListener("mousemove", onMouseMove);
         document.removeEventListener("mouseup", onResizeMouseUp);
         document.body.style.userSelect = "";
         document.body.style.cursor = "";
         resizingColumn.current = null;
         setDisablePointerEvents(false);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onResizeMouseUp);
      setDisablePointerEvents(true);
   };

   const handleSort = (accessor: string) => {
      let direction: "asc" | "desc" = "asc";
      if (sortConfig && sortConfig.key === accessor && sortConfig.direction === "asc") {
         direction = "desc";
      }
      setSortConfig({ key: accessor, direction });
   };

   const handleFilterChange = (accessor: string, value: string) => {
      setFilters((prevFilters) => ({
         ...prevFilters,
         [accessor]: value,
      }));
   };

   const filteredData = useMemo(() => {
      return data.filter((item) => {
         return Object.keys(filters).every((key) => {
            return item[key].toString().toLowerCase().includes(filters[key].toLowerCase());
         });
      });
   }, [data, filters]);

   const sortedData = useMemo(() => {
      if (!sortConfig) return filteredData;
      const sorted = [...filteredData].sort((a, b) => {
         if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
         if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
         return 0;
      });
      return sorted;
   }, [filteredData, sortConfig]);

   const filterInputs = visibleColumns.map((column) => (
      <input
         key={column.accessor}
         type="text"
         placeholder={`${column.header}`}
         value={filters[column.accessor] || ""}
         onChange={(e) => handleFilterChange(column.accessor, e.target.value)}
         className={styles.filterInput}
      />
   ));

   const tableHeaders = visibleColumns.map((column, index) => (
      <th
         key={index}
         style={{ width: columnWidths[index], textAlign: column.textAlign || "center" }}
         className={`${hoveredColumn === index ? styles.highlight_border : ""} ${
            disablePointerEvents ? styles.noPointerEvents : ""
         } ${styles.table_header_cell} ${styles.glassEffect}`}
         onClick={() => handleSort(column.accessor)}>
         {column.header}
         {sortConfig?.key === column.accessor && (
            <span style={{ fontSize: "20px" }} className={styles.sortArrow}>
               {sortConfig.direction === "asc" ? "▲" : "↴"}
            </span>
         )}
         <div
            className={styles.resize_handle}
            style={{ height: `${tableHeight}px` }}
            onMouseDown={(e) => handleResizeMouseDown(index, e)}
            onMouseEnter={() => resizingColumn.current === null && setHoveredColumn(index)}
            onMouseLeave={() => resizingColumn.current === null && setHoveredColumn(null)}
         />
      </th>
   ));

   const handleRowClick = (item: any) => {
      setPharmacySelection(item);
   };

   const tableRows = sortedData.map((item, rowIndex) => (
      <tr key={rowIndex} onClick={() => handleRowClick(item)}>
         {visibleColumns.map((column, colIndex) => (
            <td
               key={colIndex}
               style={{ textAlign: column.textAlign || "left" }}
               className={hoveredColumn === colIndex ? styles.highlight_border : ""}>
               {column.render ? column.render(item) : item[column.accessor]}
            </td>
         ))}
      </tr>
   ));

   return (
      <div className={styles.data_grid_container}>
         <div className={`${styles.filters} ${styles.glassEffect}`}>{filterInputs}</div>
         <div className={styles.data_grid_wrapper}>
            <table className={styles.table} ref={tableRef}>
               <thead>
                  <tr>{tableHeaders}</tr>
               </thead>
               <tbody>{tableRows}</tbody>
            </table>
         </div>
      </div>
   );
}
