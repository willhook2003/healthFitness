// app/routes/users.tsx
import { useState } from "react";
import { Plus } from "lucide-react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { usersService, type User } from "~/services/user.services";
import { DataTable } from "~/components/table/DataTable";
import { Pagination } from "~/components/table/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  DataTableActions,
  type TableAction,
} from "~/components/table/DataTableActions";
import type { PaginatedResponse } from "~/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";
import { useResourceKey } from "~/hooks/useResourceKey";
import { useResourcePageSize } from "~/hooks/useResourcePageSize";
import { PAGE_SIZES } from "~/contants";

const userColumns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "createdAt",
    header: "Creado",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
  },
];

export default function UsersPage() {
  const navigate = useNavigate();
  const resourceKey = useResourceKey();
  const [page, setPage] = useState(1);
  const { pageSize, setPageSize } = useResourcePageSize(resourceKey);

  const acciones: TableAction<User>[] = [
    {
      label: "Editar",
      onClick: (user) => navigate(`/users/${user.id}/edit`),
    },
    {
      label: "Eliminar",
      onClick: (user) => console.log("Eliminar usuario", user),
    },
  ];

  const { data, isFetching } = useQuery<PaginatedResponse<User>, Error>({
    queryKey: ["users", { page, limit: pageSize }],
    queryFn: () => usersService.getAllPaginated({ page, limit: pageSize }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Usuarios</h2>
          <p className="text-muted-foreground">
            Gestión de usuarios del sistema
          </p>
        </div>
        <Button onClick={() => navigate("/users/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Usuario
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={userColumns}
            data={data?.results ?? []}
            isLoading={isFetching}
            actions={(row) => (
              <DataTableActions item={row} actions={acciones} />
            )}
          />
          <Pagination
            page={page}
            pages={data?.totalPages || 1}
            pageSize={pageSize}
            pageSizeOptions={PAGE_SIZES}
            total={data?.total || 0}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
