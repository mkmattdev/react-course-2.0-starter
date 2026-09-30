import { AButton } from "@/components/atoms/AButton/AButton";

type PaginationProps = {
  currentPage: number; // 0
  pageCount: number; // 0
  onPageChange: (page: number) => void;
};

export const MPagination = ({ currentPage, pageCount, onPageChange }: PaginationProps) => (
  <nav className="flex items-center gap-3">
    <AButton
      variant="secondary"
      disabled={currentPage === 1 || pageCount <= 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      Previous
    </AButton>
    <span className="text-sm text-muted tabular-nums">
      Page {currentPage} of {pageCount}
    </span>
    <AButton
      variant="secondary"
      disabled={currentPage === pageCount || pageCount <= 1}
      onClick={() => onPageChange(currentPage + 1)}
    >
      Next
    </AButton>
  </nav>
);
