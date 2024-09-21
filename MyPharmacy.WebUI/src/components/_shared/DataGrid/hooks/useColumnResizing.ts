import { useState, useRef } from "react";

interface Column {
  width?: string;
}

export function useColumnResizing(columns: Column[]) {
  const [columnWidths, setColumnWidths] = useState<string[]>(
    columns.map((col) => col.width || "auto")
  );
  const resizingColumn = useRef<number | null>(null);
  const startWidth = useRef<number>(0);
  const startX = useRef<number>(0);

  const handleResizeMouseDown = (
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";

    const parentElement = event.currentTarget.parentElement;
    startWidth.current = parentElement ? parentElement.offsetWidth : 0;
    startX.current = event.clientX;
    resizingColumn.current = index;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const movementX = moveEvent.clientX - startX.current;
      const newWidth = Math.max(startWidth.current + movementX, 50);

      setColumnWidths((prevWidths) => {
        const newWidths = [...prevWidths];
        newWidths[resizingColumn.current as number] = `${newWidth}px`;
        return newWidths;
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      resizingColumn.current = null;
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return { columnWidths, handleResizeMouseDown };
}
