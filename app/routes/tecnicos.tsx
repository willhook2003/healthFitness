// app/routes/tecnicos.tsx
import { useState } from "react";
import { Plus } from "lucide-react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { tecnicoService } from "~/services/tecnico.services";
import { DataTable } from "~/components/table/DataTable";
import { Pagination } from "~/components/table/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  DataTableActions,
  type TableAction,
} from "~/components/table/DataTableActions";
import type { PaginatedResponse, Tecnico } from "~/types";
import { useNavigate } from "react-router";
import type { ColumnDef } from "@tanstack/react-table";

const tecnicoColumns: ColumnDef<Tecnico>[] = [
  { accessorKey: "nombre", header: "Nombre" },
  { accessorKey: "legajo", header: "Legajo" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "telefono", header: "Teléfono" },
  {
    header: "Contexto",
    accessorFn: (row) => row.contexto?.codigo || "-",
    cell: (info) => info.getValue(),
  },
];

export default function TecnicosPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const acciones: TableAction<Tecnico>[] = [
    {
      label: "Editar",
      onClick: (tecnico) => navigate(`/tecnicos/${tecnico.id}/edit`),
    },
    {
      label: "Eliminar",
      onClick: (tecnico) => console.log("Eliminar técnico", tecnico),
    },
  ];

  const { data, isFetching } = useQuery<PaginatedResponse<Tecnico>, Error>({
    queryKey: ["tecnicos", page, limit],
    queryFn: () => tecnicoService.getAllPaginated({ page, limit }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Técnicos</h2>
          <p className="text-muted-foreground">
            Gestiona los técnicos del sistema
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Técnico
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Técnicos</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={tecnicoColumns}
            data={data?.results ?? []}
            isLoading={isFetching}
            actions={(row) => (
              <DataTableActions item={row} actions={acciones} />
            )}
          />
          <Pagination
            page={page}
            pages={data?.totalPages || 1}
            total={data?.total || 0}
            onPageChange={setPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
