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

  description: z
    .string()
    .min(10, "La descripción del producto debe tener al menos 10 caracteres")
    .max(500)
    .optional(),

  price: z
    .number({ invalid_type_error: "El precio debe ser un número" })
    .positive("El precio debe ser un número positivo"),

  color: z
    .string()
    .min(3, "El color del producto debe tener al menos 3 caracteres")
    .max(50)
    .optional(),

  size: z
    .string()
    .min(1, "El tamaño del producto debe tener al menos 1 carácter")
    .max(10),

  type: z
    .string()
    .min(3, "El tipo del producto debe tener al menos 3 caracteres")
    .max(50)

  status: z
    .string()
    .min(3, "El estado del producto debe tener al menos 3 caracteres")
    .max(50)

})
