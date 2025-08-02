import axios from 'axios';
import type { Parte, Tecnico, Transporte, ApiResponse, PaginatedResponse } from '~/types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service functions with proper types
export const tecnicosApi = {
  getAll: () => api.get<ApiResponse<Tecnico[]>>('/tecnicos'),
  getById: (id: number) => api.get<ApiResponse<Tecnico>>(`/tecnicos/${id}`),
  create: (data: Omit<Tecnico, 'id'>) => api.post<ApiResponse<Tecnico>>('/tecnicos', data),
  update: (id: number, data: Partial<Tecnico>) => api.put<ApiResponse<Tecnico>>(`/tecnicos/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/tecnicos/${id}`),
};

export const transportesApi = {
  getAll: () => api.get<ApiResponse<Transporte[]>>('/transportes'),
  getById: (id: number) => api.get<ApiResponse<Transporte>>(`/transportes/${id}`),
  create: (data: Omit<Transporte, 'id'>) => api.post<ApiResponse<Transporte>>('/transportes', data),
  update: (id: number, data: Partial<Transporte>) => api.put<ApiResponse<Transporte>>(`/transportes/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/transportes/${id}`),
};

export const partesApi = {
  getAll: () => api.get<ApiResponse<Parte[]>>('/partes'),
  getById: (id: number) => api.get<ApiResponse<Parte>>(`/partes/${id}`),
  create: (data: Omit<Parte, 'id'>) => api.post<ApiResponse<Parte>>('/partes', data),
  update: (id: number, data: Partial<Parte>) => api.put<ApiResponse<Parte>>(`/partes/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/partes/${id}`),
};

export default api; 