import { z } from "zod";

const createEmailCCValidator = () =>
  z
    .string()
    .max(255, "Máximo 255 caracteres")
    .refine(
      (val) =>
        !val ||
        val
          .split(",")
          .every((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())),
      {
        message: "Debe contener emails válidos",
      }
    );

export const tecnicoBaseSchema = z.object({
  nombre: z
    .string()
    .nonempty("El nombre es obligatorio")
    .max(140, "Máximo 140 caracteres"),

  telefono: z.string().max(30, "Máximo 30 caracteres").optional(),

  legajo: z.string().max(10, "Máximo 10 caracteres").optional(),

  email: z
    .string()
    .nonempty("El email es obligatorio")
    .max(40, "Máximo 40 caracteres")
    .email("Debe ser un email válido"),

  guiaEmailCC: createEmailCCValidator().optional(),
  retornoEmailCC: createEmailCCValidator().optional(),
});

export const tecnicoSchema = tecnicoBaseSchema;

const contextoSchema = z.object({
  idContexto: z
    .string()
    .nonempty("El contexto es obligatorio")
    .refine((val) => !isNaN(Number(val)), {
      message: "El contexto debe ser un número válido",
    }),
});

export const updateTecnicoSchema = tecnicoBaseSchema
  .partial()
  .and(contextoSchema);

export type TecnicoForm = z.infer<typeof tecnicoSchema>;
export type UpdateTecnicoForm = z.infer<typeof updateTecnicoSchema>;
