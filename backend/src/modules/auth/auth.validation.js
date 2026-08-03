import { z } from "zod";

export const createLoginSchema = z.object({

  email: z
    .string()
    .email("El correo electrónico debe ser válido"),

  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),

})

export const createRegisterSchema = z.object({

  name: z
    .string()
    .min(1, "El nombre es obligatorio"),

  lastname: z
    .string()
    .min(1, "El apellido es obligatorio"),

  email: z
    .string()
    .email("El correo electrónico debe ser válido"),

  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),

  telephone: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 caracteres")

})
