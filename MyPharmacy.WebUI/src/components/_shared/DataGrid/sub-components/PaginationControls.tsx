import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./PaginationControls.module.scss";

function PaginationControls({
    pageNumber,
    pageSize,
    totalCount,
    onPageChange,
    onPageSizeChange,
}: PaginationControlsProps) {
    const totalPages = pageSize > 0 ? Math.ceil(totalCount / pageSize) : 1;
    const isNextDisabled = pageNumber + 1 >= totalPages;

    return (
        <div className={`${styles.pagination_controls} ${styles.glassEffect}`}>
            <button
                onClick={() => onPageChange(pageNumber - 1)}
                disabled={pageNumber === 0}
                className={styles.iconButton}
                aria-label="Previous Page"
            >
                <FaChevronLeft />
            </button>
            <span className={styles.pageInfo}>
                {pageNumber + 1} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(pageNumber + 1)}
                disabled={isNextDisabled}
                className={styles.iconButton}
                aria-label="Next Page"
            >
                <FaChevronRight />
            </button>
            <select
                title="Page Size"
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className={styles.pageSizeSelect}
            >
                {[10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default PaginationControls;

interface PaginationControlsProps {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}