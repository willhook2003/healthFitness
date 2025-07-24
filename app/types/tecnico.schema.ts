import { z } from "zod";

export const tecnicoSchema = z.object({
  nombre: z
    .string()
    .nonempty("El nombre es obligatorio")
    .max(140, "Máximo 140 caracteres"),

  telefono: z
    .string()
    .max(30, "Máximo 30 caracteres")
    .optional(),

  legajo: z
    .string()
    .max(10, "Máximo 10 caracteres")
    .optional(),

  email: z
    .string()
    .nonempty("El email es obligatorio")
    .max(40, "Máximo 40 caracteres")
    .email("Debe ser un email válido"),

  guiaEmailCC: z
    .string()
    .max(255, "Máximo 255 caracteres")
    .refine(
      (val) =>
        !val ||
        val
          .split(",")
          .every((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())),
      {
        message: "Debe contener emails válidos separados por coma",
      }
    )
    .optional(),

  retornoEmailCC: z
    .string()
    .max(255, "Máximo 255 caracteres")
    .refine(
      (val) =>
        !val ||
        val
          .split(",")
          .every((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())),
      {
        message: "Debe contener emails válidos separados por coma",
      }
    )
    .optional(),
});

export const updateTecnicoSchema = tecnicoSchema.partial();

export type TecnicoForm = z.infer<typeof tecnicoSchema>;
export type UpdateTecnicoForm = z.infer<typeof updateTecnicoSchema>;
