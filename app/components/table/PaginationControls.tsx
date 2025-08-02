import { Button } from "~/components/ui/button";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

export interface PaginationControlsProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  page,
  pages,
  onPageChange,
}: PaginationControlsProps) {
  const visiblePages = getVisiblePages(page, pages);

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(1)}
        disabled={page === 1}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {visiblePages.map((p) => (
        <Button
          key={p}
          variant={p === page ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(p)}
        >
          {p}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(pages)}
        disabled={page === pages}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function getVisiblePages(current: number, total: number): number[] {
  // Muestra 3 paginas visibles
  const maxVisible = 3;

  let start = Math.max(1, current - 1);
  let end = Math.min(total, current + 1);

  if (current === 1) {
    end = Math.min(total, start + maxVisible - 1);
  } else if (current === total) {
    start = Math.max(1, end - maxVisible + 1);
  }

  while (end - start + 1 < maxVisible && end < total) {
    end++;
  }
  while (end - start + 1 < maxVisible && start > 1) {
    start--;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
