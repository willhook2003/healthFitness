import { z } from "zod";

export const contextoSchema = z.object({
  idContexto: z
    .string()
    .min(1, "El contexto es obligatorio")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "El contexto debe ser un número válido",
    }),
});

export type ContextoForm = z.infer<typeof contextoSchema>;
