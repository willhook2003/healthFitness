import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/home.tsx"),
    route("tecnicos", "routes/tecnicos.tsx"),
    route(
      "tecnicos/:tecnicoId/edit",
      "routes/edit-tecnico.tsx"
    ),
    route("transportes", "routes/transportes.tsx"),
    route(
      "transportes/:transporteId/edit",
      "routes/edit-transporte.tsx"
    ),
    route("partes", "routes/partes.tsx"),
  ]),
] satisfies RouteConfig;
