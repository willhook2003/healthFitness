// app/types/transporte.schema.ts
import { z } from "zod";

export const transporteSchema = z.object({
  // Campos Obligatorios
  transporte: z
    .string()
    .nonempty("El transporte es obligatorio")
    .max(20, "Máximo 20 caracteres"),

  localidad: z
    .string()
    .nonempty("La localidad es obligatoria")
    .max(30, "Máximo 30 caracteres"),

  destinatario: z
    .string()
    .nonempty("El destinatario es obligatorio")
    .max(50, "Máximo 50 caracteres"),

  // Opcionales
  nCuenta: z.string().max(20, "Máximo 20 caracteres").optional(),
  direccion: z.string().max(240, "Máximo 240 caracteres").optional(),
  horario: z.string().max(140, "Máximo 140 caracteres").optional(),
  formPago: z.string().max(140, "Máximo 140 caracteres").optional(),
  dirDestino: z.string().max(240, "Máximo 240 caracteres").optional(),
});

export const updateTransporteSchema = transporteSchema.partial();

export type TransporteForm = z.infer<typeof transporteSchema>;

export type UpdateTransporteForm = z.infer<typeof updateTransporteSchema>;

