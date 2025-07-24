// Parte (Part) interface matching Sequelize model
export interface Parte {
  id: number;
  partNumber: string | null;
  descripcion: string | null;
}

// Contexto (Context) interface matching Sequelize model
export interface Contexto {
  id: number;
  nombre: string;
  codigo: string;
}

// Tecnico (Technician) interface matching Sequelize model
export interface Tecnico {
  id: number;
  nombre: string | null;
  telefono: string | null;
  legajo: string | null;
  email: string | null;
  contexto?: Contexto; 
}

// Transporte (Transport) interface matching Sequelize model
export interface Transporte {
  id: number;
  localidad: string | null;
  destinatario: string | null;
  transporte: string | null;
  nCuenta: string | null;
  direccion: string | null;
  horario: string | null;
  formPago: string | null;
  dirDestino: string | null;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  results: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 