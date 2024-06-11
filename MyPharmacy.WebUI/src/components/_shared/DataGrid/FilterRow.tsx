import React from "react";
import styles from "./DataGrid.module.scss";

interface Column {
   header: string;
   accessor: string;
}

interface FilterRowProps {
   columns: Column[];
   filters: { [key: string]: string };
   onFilterChange: (accessor: string, value: string) => void;
}

export const FilterRow: React.FC<FilterRowProps> = ({ columns, filters, onFilterChange }) => {
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
};
