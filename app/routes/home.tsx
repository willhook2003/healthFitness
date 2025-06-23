import { redirect } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Retornos Admin" },
    { name: "description", content: "Panel de administración de Retornos" },
  ];
}

export default function Home() {
  redirect("/tecnicos");
}
