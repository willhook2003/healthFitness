import type { TransportePaginatedResponse } from '~/types';
import axiosInstance from '../lib/api';

export const transporteService = {
  getAllPaginated: async (params: any): Promise<TransportePaginatedResponse> =>{
    try {
      const response = await axiosInstance.get('/transporte', { params });
      return response.data.data;
    } catch (error) {
      console.error('Error al obtener transportes paginados:', error);
      throw error;
    }
  },
};
