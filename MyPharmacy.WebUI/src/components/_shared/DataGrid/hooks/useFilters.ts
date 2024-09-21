import { useState, useMemo } from "react";

interface DataItem {
  [key: string]: any;
}

export function useFilters(data: DataItem[]) {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (accessor: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [accessor]: value,
    }));
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.keys(filters).every((key) =>
        item[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
      )
    );
  }, [data, filters]);

  return { filters, handleFilterChange, filteredData };
}
