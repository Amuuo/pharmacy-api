import { useState, useMemo } from "react";

interface DataItem {
  [key: string]: any;
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

export function useSort(data: DataItem[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleSort = (accessor: string) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === accessor) {
        return {
          key: accessor,
          direction: prevConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: accessor, direction: "asc" };
    });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  return { sortConfig, handleSort, sortedData };
}
