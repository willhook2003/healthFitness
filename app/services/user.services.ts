// src/services/users.services.ts
import api from "~/lib/api";
import type { PaginatedResponse } from "~/types";

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

type BackendUsersResponse = { data: User[]; total: number };

export const usersService = {
  async getAllPaginated({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    const offset = (page - 1) * limit;
    const res = await api.get<BackendUsersResponse>("/users", { params: { limit, offset } });
    const { data, total } = res.data;

    const totalPages = Math.max(1, Math.ceil(total / limit));

    const payload: PaginatedResponse<User> = {
      results: data,
      total,
      totalPages,
      page,
      limit,
    };
    return payload;
  },
};
