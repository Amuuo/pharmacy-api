import { useState, useMemo } from "react";

interface DataItem {
   [key: string]: any;
}

export function useFilters(data: DataItem[]) {
   const [filters, setFilters] = useState<{ [key: string]: string }>({});

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

   return { filters, handleFilterChange, filteredData };
}
