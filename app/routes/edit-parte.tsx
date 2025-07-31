// React hooks
import { useEffect, useState } from "react";
// React Router hooks
import { useParams, useNavigate } from "react-router";
// Form and validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Data fetching (React Query)
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// Services and types
import { parteService } from "~/services/parte.services";
import { parteSchema, type ParteForm } from "~/types/parte.schema";
import type { ApiResponse, Parte } from "~/types";
// UI components
import { SpinnerOverlay } from "~/components/spinner";
import { ErrorState } from "~/components/errorState";
import { Snackbar } from "~/components/snackbar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function EditParte() {
  // Obtener parámetro parteId desde la URL
  const { parteId } = useParams<{ parteId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Estado para controlar mensajes de notificación (Snackbar)
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    type: "success" | "error";
    title: string;
    description?: string;
  }>({ open: false, type: "success", title: "" });

  // Obtener datos de la parte con React Query
  const {
    data: parteResponse,
    isLoading,
    isError,
  } = useQuery<ApiResponse<Parte>>({
    queryKey: ["parte", parteId],
    queryFn: () => parteService.getById(parteId!),
    enabled: !!parteId,
  });

  // Inicializar react-hook-form con esquema Zod para validación
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParteForm>({
    resolver: zodResolver(parteSchema),
    defaultValues: {
      partNumber: "",
      descripcion: "",
    },
  });

  // Resetear formulario con datos recibidos cuando cambian
  useEffect(() => {
    if (parteResponse?.data) {
      const { partNumber, descripcion } = parteResponse.data;
      reset({
        partNumber: partNumber ?? "",
        descripcion: descripcion ?? "",
      });
    }
  }, [parteResponse, reset]);

  // Mutación para actualizar la parte en backend
  const mutation = useMutation({
    mutationFn: (form: ParteForm) =>
      parteService.updateParteById(parteId!, form),
    onSuccess: (res) => {
      // Refrescar listado de partes
      queryClient.invalidateQueries({ queryKey: ["partes"] });
      setSnackbar({
        open: true,
        type: "success",
        title: res.message || "Parte actualizada correctamente",
      });
      setTimeout(() => navigate("/partes"), 1500);
    },
    onError: (err) => {
      setSnackbar({
        open: true,
        type: "error",
        title: "Ocurrió un error al guardar",
        description: err instanceof Error ? err.message : undefined,
      });
    },
  });

  // Cerrar snackbar
  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  // Enviar formulario con datos a mutación
  const onSubmit = (data: ParteForm) => mutation.mutate(data);

  // Mostrar spinner mientras carga la parte
  if (isLoading) return <SpinnerOverlay />;

  // Mostrar error si no se pudo obtener la parte
  if (isError || !parteResponse?.success || !parteResponse.data)
    return (
      <ErrorState
        message="No se pudo cargar la información de la parte."
        onRetry={() =>
          queryClient.invalidateQueries({ queryKey: ["parte", parteId] })
        }
        onBack={() => navigate("/partes")}
      />
    );

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* N° Parte */}
          <div className="grid gap-1">
            <label htmlFor="partNumber" className="text-sm font-medium">
              N° Parte
            </label>
            <Input id="partNumber" maxLength={10} {...register("partNumber")} />
            {errors.partNumber && (
              <p className="text-sm text-red-500">
                {errors.partNumber.message}
              </p>
            )}
          </div>

          {/* Descripción */}
          <div className="grid gap-1 col-span-full">
            <label htmlFor="descripcion" className="text-sm font-medium">
              Descripción
            </label>
            <Input
              id="descripcion"
              maxLength={140}
              {...register("descripcion")}
            />
            {errors.descripcion && (
              <p className="text-sm text-red-500">
                {errors.descripcion.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <Button type="submit" disabled={mutation.isPending}>
            Guardar
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/partes")}
          >
            Cancelar
          </Button>
        </div>
      </form>

      <Snackbar {...snackbar} onClose={closeSnackbar} />

      {mutation.isPending && (
        <div className="fixed inset-0 bg-white/60 z-[20] flex items-center justify-center">
          <SpinnerOverlay
            height="auto"
            message="Guardando parte..."
            className="relative z-[20]"
          />
        </div>
      )}
    </>
  );
}
