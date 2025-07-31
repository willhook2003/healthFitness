import { z } from "zod";

export const parteSchema = z.object({
  partNumber: z
    .string()
    .nonempty("El número de parte es obligatorio")
    .max(10, "Máximo 10 caracteres"),
  descripcion: z
    .string()
    .max(140, "Máximo 140 caracteres")
    .nonempty("La descripción es obligatoria"),
});

export type ParteForm = z.infer<typeof parteSchema>;
