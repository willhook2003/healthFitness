import type { PaginatedResponse, Parte, ApiResponse } from "~/types";
import axiosInstance from "../lib/api";

export const parteService = {
  getAllPaginated: async (params: any): Promise<PaginatedResponse<Parte>> => {
    try {
      const response = await axiosInstance.get("/parte", { params });
      return response.data.data;
    } catch (error) {
      console.error("Error al obtener partes paginadas:", error);
      throw error;
    }
  },

  getById: async (id: any): Promise<ApiResponse<Parte>> => {
    try {
      const response = await axiosInstance.get(`/parte/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener parte por ID:", error);
      throw error;
    }
  },

  updateParteById: async (
    id: any,
    data: Partial<Parte>
  ): Promise<ApiResponse<Parte>> => {
    try {
      const response = await axiosInstance.patch(`/parte/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar parte:", error);
      throw error;
    }
  },
};
