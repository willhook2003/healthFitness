import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { parteService } from "~/services/parte.services";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/table/DataTable";
import { Pagination } from "~/components/table/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Plus } from "lucide-react";
import {
  DataTableActions,
  type TableAction,
} from "~/components/table/DataTableActions";
import type { PaginatedResponse, Parte } from "~/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";
import { useResourceKey } from "~/hooks/useResourceKey";
import { useResourcePageSize } from "~/hooks/useResourcePageSize";
import { PAGE_SIZES } from "~/contants";

const parteColumns: ColumnDef<Parte>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "partNumber", header: "N° Parte" },
  { accessorKey: "descripcion", header: "Descripción" },
];

export default function PartesPage() {
  const navigate = useNavigate();
  const resourceKey = useResourceKey();
  const [page, setPage] = useState(1);
  const { pageSize, setPageSize } = useResourcePageSize(resourceKey);

  const acciones: TableAction<Parte>[] = [
    {
      label: "Editar",
      onClick: (parte) => navigate(`/partes/${parte.id}/edit`),
    },
    {
      label: "Eliminar",
      onClick: (parte) => console.log("Eliminar parte", parte),
    },
  ];

  const { data, isFetching } = useQuery<PaginatedResponse<Parte>, Error>({
    queryKey: ["partes", { page, limit: pageSize }],
    queryFn: () => parteService.getAllPaginated({ page, limit: pageSize }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Partes</h2>
          <p className="text-muted-foreground">
            Gestiona el inventario de partes y repuestos
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Parte
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Partes</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={parteColumns}
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