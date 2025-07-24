import type { PaginatedResponse, Tecnico, Contexto } from "~/types";
import axiosInstance from "../lib/api";

type TecnicoFromBackend = Omit<Tecnico, 'contexto'> & { Contexto?: Contexto };

export const tecnicoService = {
  getAllPaginated: async (params: any): Promise<PaginatedResponse<Tecnico>> => {
    try {
      const response = await axiosInstance.get("/tecnico", { params });
      const data = response.data.data;

      const mappedResults: Tecnico[] = data.results.map(
        ({ Contexto, ...restTecnico }: TecnicoFromBackend) => ({
          ...restTecnico,
          contexto: Contexto,
        })
      );

      return {
        ...data,
        results: mappedResults,
      };
    } catch (error) {
      console.error("Error al obtener técnicos paginados:", error);
      throw error;
    }
  },
};
