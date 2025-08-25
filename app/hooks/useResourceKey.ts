import { useMatches, useLocation } from "react-router";

type Handle = { resource?: string };

export function useResourceKey() {
  const matches = useMatches() as Array<{ handle?: Handle }>;
  // 1) Por useMatches
  for (let i = matches.length - 1; i >= 0; i--) {
    const h = matches[i]?.handle;
    if (h?.resource) return h.resource;
  }
  // 2) Fallback por URL
  const { pathname } = useLocation();
  const first = pathname.split("?")[0].split("/").filter(Boolean)[0] ?? "home";
  return first;
}
