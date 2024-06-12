import { useState, useRef } from "react";

interface Column {
   width?: string;
}

export function useColumnResizing(columns: Column[]) {
   const [columnWidths, setColumnWidths] = useState<string[]>(columns.map((col) => col.width || "auto"));
   const resizingColumn = useRef<number | null>(null);
   const startWidth = useRef<number>(0);
   const startX = useRef<number>(0);

   const handleResizeMouseDown = (
      index: number,
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
   ) => {
      event.preventDefault();
      event.stopPropagation();
      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";

      startWidth.current = event.currentTarget.parentElement
         ? event.currentTarget.parentElement.offsetWidth
         : 0;
      startX.current = event.clientX;
      resizingColumn.current = index;

      const onMouseMove = (moveEvent: MouseEvent) => {
         const movementX = moveEvent.clientX - startX.current;
         const newWidth = Math.max(startWidth.current + movementX, 0);

         setColumnWidths((prevWidths) => {
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
