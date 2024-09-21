import styles from "./TableBody.module.scss";

function TableBody({
   data,
   columns,
   onRowSelect,
   onDoubleClick,
   selectedRow,
   setSelectedRow,
   columnWidths,
}: TableBodyProps) {
   return (
      <tbody>
         {data.map((row, rowIndex) => (
            <tr
               key={row.id || rowIndex}
               onClick={() => {
                  setSelectedRow(rowIndex);
                  onRowSelect?.(row);
               }}
               onDoubleClick={() => onDoubleClick?.(row)}
               className={selectedRow === rowIndex ? styles.selectedRow : ""}>
               {columns.map((col, colIndex) => (
                  <td key={col.accessor} style={{ width: columnWidths[colIndex] }}>
                     {col.render ? col.render(row) : row[col.accessor]}
                  </td>
               ))}
            </tr>
         ))}
      </tbody>
   );
}

export default TableBody;

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
   columnWidths: number[];
}
