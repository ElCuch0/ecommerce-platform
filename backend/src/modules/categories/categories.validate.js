import { z } from "zod";

export const createCategorySchema = z.object({

  categoryId: z
    .number({ invalid_type_error: "El ID de la categoría debe ser un número" })
    .int("El ID de la categoría debe ser un número entero"),

  name: z
    .string()
    .min(3, "El nombre de la categoría debe tener al menos 3 caracteres")
    .max(100),

  description: z
    .string()
    .min(10, "La descripción de la categoría debe tener al menos 10 caracteres")
    .max(500)

})
