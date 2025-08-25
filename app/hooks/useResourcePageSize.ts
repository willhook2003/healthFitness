import { useCallback } from "react";
import { usePaginationStore } from "~/store/pagination.store";

export function useResourcePageSize(resource: string) {
  const pageSize = usePaginationStore((s) => s.getPageSize(resource));
  const setPageSize = usePaginationStore((s) => s.setPageSize);
  const set = useCallback((size: number) => setPageSize(resource, size), [resource, setPageSize]);
  return { pageSize, setPageSize: set };
}
