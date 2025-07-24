import type { PaginatedResponse, Tecnico } from "~/types";
import axiosInstance from "../lib/api";

export const tecnicoService = {
  getAllPaginated: async (params: any): Promise<PaginatedResponse<Tecnico>> => {
    try {
      const response = await axiosInstance.get("/tecnico", { params });
      return response.data.data;
    } catch (error) {
      console.error("Error al obtener técnicos paginados:", error);
      throw error;
    }
  },
};
