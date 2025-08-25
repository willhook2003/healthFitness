import { PaginationControls } from "./PaginationControls";

interface PaginationProps {
  page: number;
  pages: number;
  total: number;
  pageSize: number;
  pageSizeOptions?: readonly number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function Pagination({
  page,
  pages,
  total,
  pageSize,
  pageSizeOptions = [10, 20, 30, 50],
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {

  return (
    <div
      role="navigation"
      aria-label="Paginación"
      className="mt-4 w-full flex flex-wrap items-center gap-3 text-sm justify-center md:justify-between"
    >
      <div className="flex w-full md:w-auto items-center justify-center md:justify-start gap-3 text-muted-foreground">
        <span className="text-foreground">
          Página {page} de {pages} — Total: {total}
        </span>
        <span className="hidden sm:inline">•</span>
        <label htmlFor="pageSize" className="text-muted-foreground">
          Mostrar
        </label>
        <select
          id="pageSize"
          className="h-9 rounded-md border bg-background px-2"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="text-muted-foreground">por página</span>
      </div>

      {/* Controles */}
      <div className="flex w-full md:w-auto items-center justify-center md:justify-end gap-3">
        <PaginationControls page={page} pages={pages} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
