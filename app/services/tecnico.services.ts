import type { PaginatedResponse, Tecnico, Contexto } from "~/types";
import axiosInstance from "../lib/api";
import type { UpdateTecnicoForm } from "~/types/tecnico.schema";

type TecnicoFromBackend = Omit<Tecnico, "contexto"> & { Contexto?: Contexto };

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

  getById: async (id: any): Promise<Tecnico> => {
    try {
      const response = await axiosInstance.get(`/tecnico/${id}`);
      const tecnicoBackend: TecnicoFromBackend = response.data.data;

      return {
        ...tecnicoBackend,
        contexto: tecnicoBackend.Contexto,
      };
    } catch (error) {
      console.error("Error al obtener técnico por ID:", error);
      throw error;
    }
  },

  updateTecnicoById: async (
    id: any,
    form: UpdateTecnicoForm
  ): Promise<{ id: number }> => {
    try {
      const response = await axiosInstance.patch(`/tecnico/${id}`, form);
      return response.data.data;
    } catch (error) {
      console.error("Error al actualizar técnico:", error);
      throw error;
    }
  },
};
