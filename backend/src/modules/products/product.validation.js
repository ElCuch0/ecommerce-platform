import { z } from "zod";

export const createProductSchema = z.object({

  productId: z
    .number({ invalid_type_error: "El ID del producto debe ser un número" })
    .int("El ID del producto debe ser un número entero"),

  categoryId: z
    .number({ invalid_type_error: "El ID de la categoría debe ser un número" })
    .int("El ID de la categoría debe ser un número entero"),

  name: z
    .string()
    .min(3, "El nombre del producto debe tener al menos 3 caracteres")
    .max(100),

  price: z
    .number({ invalid_type_error: "El precio debe ser un número" })
    .positive("El precio debe ser un número positivo")
})