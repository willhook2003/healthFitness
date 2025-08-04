import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Transporte, PaginatedResponse } from "~/types";
import { transporteService } from "~/services/transporte.services";
import { DataTable } from "~/components/table/DataTable";
import {
  DataTableActions,
  type TableAction,
} from "~/components/table/DataTableActions";
import { Pagination } from "~/components/table/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

const columns: ColumnDef<Transporte>[] = [
  {
    accessorKey: "transporte",
    header: "Transporte",
  },
  {
    accessorKey: "localidad",
    header: "Localidad",
  },
  {
    accessorKey: "direccion",
    header: "Dirección",
  },
  {
    accessorKey: "horario",
    header: "Horario",
  },
  {
    accessorKey: "nCuenta",
    header: "N° Cuenta",
  },
  {
    accessorKey: "formPago",
    header: "Forma Pago",
  },
  {
    accessorKey: "destinatario",
    header: "Destinatario",
  },
  {
    accessorKey: "dirDestino",
    header: "Dir. Destino",
  },
];

export default function TransportesPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit] = useState(10); // cantidad por página

  const acciones: TableAction<Transporte>[] = [
    {
      label: "Editar",
      onClick: (transporte) => navigate(`/transportes/${transporte.id}/edit`),
    },
    {
      label: "Eliminar",
      onClick: (transporte) => console.log("Eliminar", transporte),
    },
  ];

  const { data, isPending, isFetching, isError, error, isPlaceholderData } =
    useQuery<PaginatedResponse<Transporte>, Error>({
      queryKey: ["transportes", page, limit],
      queryFn: () => transporteService.getAllPaginated({ page, limit }),
      placeholderData: keepPreviousData,
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transportes</h2>
          <p className="text-muted-foreground">
            Gestiona los transportes del sistema
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Transporte
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Transportes</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tabla */}
          <DataTable
            columns={columns}
            data={data?.results ?? []}
            isLoading={isFetching}
            actions={(row) => (
              <DataTableActions item={row} actions={acciones} />
            )}
          />
          {/* Paginación */}
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
