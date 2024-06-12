import React from "react";
import styles from "../DataGrid.module.scss";

interface Column {
   header: string;
   accessor: string;
   textAlign?: "left" | "right" | "center";
   render?: (item: any) => React.ReactNode;
}

interface TableBodyProps {
   data: any[];
   columns: Column[];
   onRowSelect?: (selectedRow: any) => void;
   onDoubleClick?: (selectedRow: any) => void;
   selectedRow: number | null;
   setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>;
}

export const TableBody: React.FC<TableBodyProps> = ({
   data,
   columns,
   onRowSelect,
   onDoubleClick,
   selectedRow,
   setSelectedRow,
}) => {
   const handleRowClick = (item: any, rowIndex: number) => {
      setSelectedRow(rowIndex);
      if (onRowSelect) onRowSelect(item);
   };

   const handleRowDoubleClick = (item: any) => {
      if (onDoubleClick) onDoubleClick(item);
   };

   return (
      <tbody>
         {data.map((item, rowIndex) => (
            <tr
               key={rowIndex}
               onClick={() => handleRowClick(item, rowIndex)}
               onDoubleClick={() => handleRowDoubleClick(item)}
               className={selectedRow === rowIndex ? styles.selectedRow : ""}>
               {columns.map((column, colIndex) => (
                  <td
                     key={colIndex}
                     style={{ textAlign: column.textAlign || "left" }}
                     className={styles.table_cell}>
                     {column.render ? column.render(item) : item[column.accessor]}
                  </td>
               ))}
            </tr>
         ))}
      </tbody>
   );
};
