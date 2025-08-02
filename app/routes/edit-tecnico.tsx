import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { tecnicoService } from "~/services/tecnico.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerOverlay } from "~/components/spinner";
import { ErrorState } from "~/components/errorState";
import { Snackbar } from "~/components/snackbar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "~/components/ui/select";
import {
  updateTecnicoSchema,
  type UpdateTecnicoForm,
} from "~/types/tecnico.schema";
import { TagInput } from "~/components/tagInput";

const contextosHardcoded = [
  { id: 1, nombre: "Gran Buenos Aires", codigo: "AMBA" },
  { id: 2, nombre: "Interior", codigo: "INT" },
];

export default function EditTecnico() {
  const { tecnicoId } = useParams<{ tecnicoId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    type: "success" | "error";
    title: string;
    description?: string;
  }>({ open: false, type: "success", title: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para controlar los email
  const [guiaEmailTags, setGuiaEmailTags] = useState<string[]>([]);
  const [retornoEmailTags, setRetornoEmailTags] = useState<string[]>([]);

  const {
    data: tecnico,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tecnico", tecnicoId],
    queryFn: () => tecnicoService.getById(tecnicoId!),
    enabled: !!tecnicoId,
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateTecnicoForm>({
    resolver: zodResolver(updateTecnicoSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (tecnico) {
      reset({
        nombre: tecnico.nombre ?? "",
        telefono: tecnico.telefono ?? "",
        legajo: tecnico.legajo ?? "",
        email: tecnico.email ?? "",
        guiaEmailCC: tecnico.guiaEmailCC ?? "",
        retornoEmailCC: tecnico.retornoEmailCC ?? "",
        idContexto: tecnico.contexto?.id?.toString() || "",
      });
      setGuiaEmailTags(
        tecnico.guiaEmailCC
          ? tecnico.guiaEmailCC.split(",").map((s) => s.trim())
          : []
      );
      setRetornoEmailTags(
        tecnico.retornoEmailCC
          ? tecnico.retornoEmailCC.split(",").map((s) => s.trim())
          : []
      );
    }
  }, [tecnico, reset]);

  // Si cambia el array de email de guia, seteamos a string guiaEmailCC(separados por coma)
  useEffect(() => {
    const guiaEmails = guiaEmailTags.join(", ");
    setValue("guiaEmailCC", guiaEmails);
  }, [guiaEmailTags, setValue]);

  // Si cambia el array de email de retorno, seteamos a string retornoEmailCC(separados por coma)
  useEffect(() => {
    const retornoEmails = retornoEmailTags.join(", ");
    setValue("retornoEmailCC", retornoEmails);
  }, [retornoEmailTags, setValue]);

  const mutation = useMutation({
    mutationFn: (formData: UpdateTecnicoForm) =>
      tecnicoService.updateTecnicoById(tecnicoId!, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tecnicos"] });
      setSnackbar({
        open: true,
        type: "success",
        title: "Técnico actualizado correctamente",
      });
      setIsSubmitting(true);
      setTimeout(() => navigate("/tecnicos"), 1500);
    },
    onError: (error: any) => {
      setSnackbar({
        open: true,
        type: "error",
        title: "Error al actualizar",
        description: error.message || "",
      });
    },
  });

  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const onSubmit = (data: UpdateTecnicoForm) => mutation.mutate(data);

  if (isLoading) return <SpinnerOverlay />;

  if (isError || !tecnico)
    return (
      <ErrorState
        message="No se pudo cargar la información del técnico."
        onRetry={() =>
          queryClient.invalidateQueries({ queryKey: ["tecnico", tecnicoId] })
        }
        onBack={() => navigate("/tecnicos")}
      />
    );

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre */}
          <div className="grid gap-1">
            <label htmlFor="nombre" className="text-sm font-medium">
              Nombre
            </label>
            <Input id="nombre" maxLength={140} {...register("nombre")} />
            {errors.nombre && (
              <p className="text-sm text-red-500">{errors.nombre.message}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="grid gap-1">
            <label htmlFor="telefono" className="text-sm font-medium">
              Teléfono
            </label>
            <Input id="telefono" maxLength={30} {...register("telefono")} />
            {errors.telefono && (
              <p className="text-sm text-red-500">{errors.telefono.message}</p>
            )}
          </div>

          {/* Legajo */}
          <div className="grid gap-1">
            <label htmlFor="legajo" className="text-sm font-medium">
              Legajo
            </label>
            <Input id="legajo" maxLength={10} {...register("legajo")} />
            {errors.legajo && (
              <p className="text-sm text-red-500">{errors.legajo.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" maxLength={40} {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Guia Email CC */}
          <div className="grid gap-1 col-span-full">
            <label htmlFor="guiaEmailCC" className="text-sm font-medium">
              Guía Email CC
            </label>
            <Controller
              control={control}
              name="guiaEmailCC"
              render={() => (
                <TagInput
                  placeholder="Agregar email"
                  tags={guiaEmailTags}
                  setTags={setGuiaEmailTags}
                  className="w-full"
                />
              )}
            />
            {errors.guiaEmailCC && (
              <p className="text-sm text-red-500">
                {errors.guiaEmailCC.message}
              </p>
            )}
          </div>

          {/* Retorno Email CC */}
          <div className="grid gap-1 col-span-full">
            <label htmlFor="retornoEmailCC" className="text-sm font-medium">
              Retorno Email CC
            </label>
            <Controller
              control={control}
              name="retornoEmailCC"
              render={() => (
                <TagInput
                  placeholder="Agregar email"
                  tags={retornoEmailTags}
                  setTags={setRetornoEmailTags}
                  className="w-full"
                />
              )}
            />
            {errors.retornoEmailCC && (
              <p className="text-sm text-red-500">
                {errors.retornoEmailCC.message}
              </p>
            )}
          </div>

          {/* Contexto (select) */}
          <div className="grid gap-1 col-span-full md:col-span-1">
            <label htmlFor="idContexto" className="text-sm font-medium">
              Contexto
            </label>
            <Controller
              control={control}
              name="idContexto"
              render={({ field }) => (
                <Select
                  key={field.value}
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    className="w-full"
                    id="idContexto"
                    aria-label="Contexto"
                  >
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    {contextosHardcoded.map((ctx) => (
                      <SelectItem key={ctx.id} value={ctx.id.toString()}>
                        {ctx.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.idContexto && (
              <p className="text-sm text-red-500">
                {errors.idContexto.message}
              </p>
            )}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <Button type="submit">Guardar</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/tecnicos")}
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
            message="Guardando técnico..."
            className="relative z-[20]"
          />
        </div>
      )}
    </>
  );
}
