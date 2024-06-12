import { useState, useMemo } from "react";

interface DataItem {
   [key: string]: any;
}

export function useSort(data: DataItem[]) {
   const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(
      null
   );

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
