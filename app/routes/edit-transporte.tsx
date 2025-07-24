import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { transporteService } from "~/services/transporte.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerOverlay } from "~/components/spinner";
import { ErrorState } from "~/components/errorState";
import { Snackbar } from "~/components/snackbar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  transporteSchema,
  type TransporteForm,
} from "~/types/transporte.schema";

export default function EditTransporte() {
  const { transporteId } = useParams<{ transporteId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Estado para snackbar
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    type: "success" | "error";
    title: string;
    description?: string;
  }>({ open: false, type: "success", title: "" });

  // Estado para mostrar spinner de guardado
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Consulta para obtener los datos del transporte por ID
  const {
    data: transporte,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transporte", transporteId],
    queryFn: () => transporteService.getById(transporteId!),
    enabled: !!transporteId,
  });

  // useForm y validación Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransporteForm>({
    resolver: zodResolver(transporteSchema),
    defaultValues: {
      transporte: "",
      nCuenta: "",
      localidad: "",
      horario: "",
      formPago: "",
      direccion: "",
      dirDestino: "",
      destinatario: "",
    },
  });

  // Reset Form al cargar transporte
  useEffect(() => {
    if (transporte) {
     reset(transporte as TransporteForm);
    }
  }, [transporte, reset]);

  // Mutación para actualizar transporte
  const mutation = useMutation({
    mutationFn: (form: TransporteForm) =>
      transporteService.updateTranporteById({ id: transporteId!, ...form }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transportes"] });
      setSnackbar({
        open: true,
        type: "success",
        title: "Transporte actualizado correctamente",
      });
      // Mostrar spinner de guardado y redirect
      setIsSubmitting(true);
      setTimeout(() => {
        navigate("/transportes");
      }, 1500);
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

  // Función para cerrar snackbar
  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  // Función para enviar el formulario
  const onSubmit = (data: TransporteForm) => {
    mutation.mutate(data);
  };

  // Spinner al cargar
  if (isLoading) return <SpinnerOverlay />;

  // Mostrar error de carga
  if (isError || !transporte)
    return (
      <ErrorState
        message="No se pudo cargar la información del transporte."
        onRetry={() =>
          queryClient.invalidateQueries({
            queryKey: ["transporte", transporteId],
          })
        }
        onBack={() => navigate("/transportes")}
      />
    );

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Transporte */}
          <div className="grid gap-1">
            <label htmlFor="transporte" className="text-sm font-medium">
              Transporte
            </label>
            <Input id="transporte" maxLength={20} {...register("transporte")} />
            {errors.transporte && (
              <p className="text-sm text-red-500">
                {errors.transporte.message}
              </p>
            )}
          </div>

           {/* Nº de Cuenta */}
          <div className="grid gap-1">
            <label htmlFor="nCuenta" className="text-sm font-medium">
              Nº de Cuenta
            </label>
            <Input id="nCuenta" maxLength={20} {...register("nCuenta")} />
          </div>

          {/* Localidad */}
          <div className="grid gap-1">
            <label htmlFor="localidad" className="text-sm font-medium">
              Localidad
            </label>
            <Input id="localidad" maxLength={30} {...register("localidad")} />
            {errors.localidad && (
              <p className="text-sm text-red-500">{errors.localidad.message}</p>
            )}
          </div>

           {/* Destinatario */}
          <div className="grid gap-1">
            <label htmlFor="destinatario" className="text-sm font-medium">
              Destinatario
            </label>
            <Input
              id="destinatario"
              maxLength={50}
              {...register("destinatario")}
            />
            {errors.destinatario && (
              <p className="text-sm text-red-500">
                {errors.destinatario.message}
              </p>
            )}
          </div>

          {/* Horario */}
          <div className="grid gap-1 col-span-full md:col-span-1">
            <label htmlFor="horario" className="text-sm font-medium">
              Horario
            </label>
            <Input id="horario" maxLength={140} {...register("horario")} />
          </div>

          {/* Forma de Pago */}
          <div className="grid gap-1 col-span-full md:col-span-1">
            <label htmlFor="formPago" className="text-sm font-medium">
              Forma de Pago
            </label>
            <Input id="formPago" maxLength={140} {...register("formPago")} />
          </div>

            {/* Dirección */}
          <div className="grid gap-1 col-span-full">
            <label htmlFor="direccion" className="text-sm font-medium">
              Dirección
            </label>
            <Input id="direccion" maxLength={240} {...register("direccion")} />
          </div>

           {/* Dirección de Destino */}
          <div className="grid gap-1 col-span-full">
            <label htmlFor="dirDestino" className="text-sm font-medium">
              Dirección de Destino
            </label>
            <Input
              id="dirDestino"
              maxLength={240}
              {...register("dirDestino")}
            />
          </div>
        </div>

{/* Botones */}
        <div className="flex gap-4 pt-2">
          <Button type="submit" disabled={mutation.isPending}>
            Guardar
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/transportes")}
          >
            Cancelar
          </Button>
        </div>
      </form>

      <Snackbar
        open={snackbar.open}
        onClose={closeSnackbar}
        type={snackbar.type}
        title={snackbar.title}
        description={snackbar.description}
      />

      {isSubmitting && (
        <div className="fixed inset-0 bg-white/60 z-[20] flex items-center justify-center">
          <SpinnerOverlay
            height="auto"
            message="Guardando transporte..."
            className="relative z-[20]"
          />
        </div>
      )}
    </>
  );
}
