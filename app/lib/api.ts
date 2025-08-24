import axios from 'axios';

// Si ya tenés tipos (Parte, Tecnico, etc), mantenelos.
// Para users de demo, tipamos inline:
export type ApiResponse<T> = { data: T; total?: number }; // ajustá a tu contrato real
export type User = { id: number; name: string; email: string; createdAt: string };

// ==== Axios base ====
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
  // timeout opcional para no colgar la UI:
  timeout: 15000,
});

// Request: adjuntar token si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response: manejo de 401 y otros errores comunes
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem('authToken');
      // Redirigí solo si NO estás ya en /login para evitar loops
      if (!location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ==== Helpers de auth opcionales ====
export const auth = {
  setToken: (token: string) => localStorage.setItem('authToken', token),
  clearToken: () => localStorage.removeItem('authToken'),
  getToken: () => localStorage.getItem('authToken'),
};

// ==== Healthcheck (para probar conectividad) ====
export const healthApi = {
  ping: () => api.get('/ping'),
  health: () => api.get('/health'),
};

// ==== Users (demo punta a punta con backend nuevo) ====
export type UsersResponse = { data: User[]; total: number };
export const usersApi = {
  getAll: (params?: { limit?: number; offset?: number }) =>
    api.get<UsersResponse>('/users', { params }),
  // futuros:
  // create: (payload: Pick<User, 'name'|'email'>) => api.post<ApiResponse<User>>('/users', payload),
};

// ==== (ejemplos) Tecnicos, Transportes, Partes ====
// Ajustá los tipos si ya los tenés definidos en '~/types'
export type Tecnico = { id: number; nombre: string };
export type Transporte = { id: number; nombre: string };
export type Parte = { id: number; descripcion: string };

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
