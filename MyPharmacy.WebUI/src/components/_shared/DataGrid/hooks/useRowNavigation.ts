import { useEffect, useCallback, Dispatch, RefObject, SetStateAction } from "react";

interface UseRowNavigationProps {
   selectedRow: number | null;
   setSelectedRow: Dispatch<SetStateAction<number | null>>;
   sortedData: any[];
   onRowSelect?: (selectedRow: any) => void;
   tableRef: RefObject<HTMLDivElement>;
}

export function useRowNavigation({
   selectedRow,
   setSelectedRow,
   sortedData,
   onRowSelect,
   tableRef,
}: UseRowNavigationProps) {
   const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
         if (selectedRow === null) return;
         let newRow = selectedRow;
         if (event.key === "ArrowDown") {
            newRow = Math.min(selectedRow + 1, sortedData.length - 1);
         } else if (event.key === "ArrowUp") {
            newRow = Math.max(selectedRow - 1, 0);
         }
         if (newRow !== selectedRow) {
            setSelectedRow(newRow);
            if (onRowSelect) onRowSelect(sortedData[newRow]);

            const rowElement = tableRef.current?.querySelectorAll("tbody tr")[newRow];
            if (rowElement && tableRef.current) {
               const rowRect = rowElement.getBoundingClientRect();
               const tableRect = tableRef.current.getBoundingClientRect();

               if (rowRect.bottom > tableRect.bottom) {
                  tableRef.current.scrollTop += rowRect.height / 2;
               } else if (rowRect.top < tableRect.top) {
                  tableRef.current.scrollTop -= rowRect.height;
               }
            }
         }
      },
      [selectedRow, sortedData, onRowSelect, setSelectedRow, tableRef],
   );

   useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, [handleKeyDown]);
}
