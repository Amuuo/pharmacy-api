import { useState, useRef, useMemo } from "react";

export function useColumnWidths(columns: any[]) {
   const [columnWidths, setColumnWidths] = useState(columns.map((col: { width: any; }) => col.width || "auto"));
   const resizingColumn = useRef<number | null>(null);
   const startWidth = useRef<number>(0);
   const startX = useRef<number>(0);

   const handleResizeMouseDown = (index: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";

      startWidth.current = event.currentTarget.parentElement ? event.currentTarget.parentElement.offsetWidth : 0;
      startX.current = event.clientX;
      resizingColumn.current = index;

      const onMouseMove = (moveEvent: MouseEvent) => {
         const movementX = moveEvent.clientX - startX.current;
         const newWidth = Math.max(startWidth.current + movementX, 0);

         setColumnWidths((prevWidths: any) => {
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
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onResizeMouseUp);
   };

   return { columnWidths, handleResizeMouseDown };
}

export function useFilters(data: any, columns) {
   const [filters, setFilters] = useState<{ [key: string]: string }>({});

   const handleFilterChange = (accessor: string, value: string) => {
      setFilters((prevFilters) => ({
         ...prevFilters,
         [accessor]: value,
      }));
   };

   const filteredData = useMemo(() => {
      return data.filter((item: { [x: string]: { toString: () => string; }; }) => {
         return Object.keys(filters).every((key) => {
            return item[key].toString().toLowerCase().includes(filters[key].toLowerCase());
         });
      });
   }, [data, filters]);

   return { filters, handleFilterChange, filteredData };
}

export function useSort(data: unknown) {
   const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

   const handleSort = (accessor: string) => {
      let direction: "asc" | "desc" = "asc";
      if (sortConfig && sortConfig.key === accessor && sortConfig.direction === "asc") {
         direction = "desc";
      }
      setSortConfig({ key: accessor, direction });
   };

   const sortedData = useMemo(() => {
      if (!sortConfig) return data;
      const sorted = [...data].sort((a, b) => {
         if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
         if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
         return 0;
      });
      return sorted;
   }, [data, sortConfig]);

   return { sortConfig, handleSort, sortedData };
}
