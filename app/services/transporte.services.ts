import type { PaginatedResponse, Transporte } from "~/types";
import axiosInstance from "../lib/api";
import type { UpdateTransporteForm } from "~/schema/transporte.schema";

export const transporteService = {
  getAllPaginated: async (
    params: any
  ): Promise<PaginatedResponse<Transporte>> => {
    try {
      const response = await axiosInstance.get("/transporte", { params });
      return response.data.data;
    } catch (error) {
      console.error("Error al obtener transportes paginados:", error);
      throw error;
    }
  },

  getById: async (id: any) => {
    try {
      const response = await axiosInstance.get(`/transporte/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(error, "No se pudo obtener el transporte por Id", { id });
    }
  },

  updateTranporteById: async (args: { id: string } & UpdateTransporteForm) => {
    const { id, ...payload } = args;
    try {
      const response = await axiosInstance.patch(`/transporte/${id}`, payload);
      return response.data.data;
    } catch (error) {
      console.error("Error al actualizar transporte:", error);
      throw error;
    }
  },
};
