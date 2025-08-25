import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DEFAULT_PAGE_SIZE } from "~/contants";

type PaginationState = {
  defaultPageSize: number;
  byResource: Record<string, number>;
  setPageSize: (resource: string, size: number) => void;
  getPageSize: (resource: string) => number;
  reset: () => void;
};

export const usePaginationStore = create<PaginationState>()(
  persist(
    (set, get) => ({
      defaultPageSize: DEFAULT_PAGE_SIZE,
      byResource: {},
      setPageSize: (resource, size) =>
        set((s) => ({ byResource: { ...s.byResource, [resource]: size } })),
      getPageSize: (resource) => {
        const s = get();
        return s.byResource[resource] ?? s.defaultPageSize;
      },
      reset: () => set({ defaultPageSize: DEFAULT_PAGE_SIZE, byResource: {} }),
    }),
    {
      name: "retornos-admin.pagination",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
