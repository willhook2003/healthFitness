import { PaginationControls } from "./PaginationControls";

interface PaginationProps {
  page: number;
  pages: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pages, total, onPageChange }: PaginationProps) {
  return (
    <div className="mt-4 flex items-center justify-between flex-wrap gap-2 text-sm">
      <div className="text-muted-foreground">
        Página {page} de {pages} — Total: {total}
      </div>
      <PaginationControls page={page} pages={pages} onPageChange={onPageChange} />
    </div>
  );
}
