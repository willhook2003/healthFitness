// app/hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import { usersApi, type UsersResponse } from '../lib/api';

export function useUsers(params?: { limit?: number; offset?: number }) {
  return useQuery<UsersResponse>({
    queryKey: ['users', params],
    queryFn: () => usersApi.getAll(params).then(r => r.data),
    staleTime: 60_000,
  });
}
