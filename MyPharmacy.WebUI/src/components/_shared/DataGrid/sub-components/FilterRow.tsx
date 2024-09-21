import React from "react";
import styles from "./FilterRow.module.scss";

interface Column {
   header: string;
   accessor: string;
}

interface FilterRowProps {
   columns: Column[];
   filters: Record<string, string>;
   onFilterChange: (accessor: string, value: string) => void;
}

function FilterRow({ columns, filters, onFilterChange }: FilterRowProps) {
   return (
      <div className={`${styles.filters} ${styles.glassEffect}`}>
         {columns.map((column) => (
            <input
               key={column.accessor}
               type="text"
               placeholder={column.header}
               value={filters[column.accessor] || ""}
               onChange={(e) => onFilterChange(column.accessor, e.target.value)}
               className={styles.filterInput}
            />
         ))}
      </div>
   );
}

export default FilterRow;
