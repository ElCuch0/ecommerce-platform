import { z } from "zod";

export const createInventorySchema = z.object({

  inventoryId: z
    .number({ invalid_type_error: "El ID del inventario debe ser un número" })
    .int("El ID del inventario debe ser un número entero"),

  productId: z
    .number({ invalid_type_error: "El ID del producto debe ser un número" })
    .int("El ID del producto debe ser un número entero"),

  stock: z
    .number({ invalid_type_error: "El stock debe ser un número" })
    .int("El stock debe ser un número entero")
    .nonnegative("El stock no puede ser negativo"),

  minStock: z
    .number({ invalid_type_error: "El stock mínimo debe ser un número" })
    .int("El stock mínimo debe ser un número entero")
    .nonnegative("El stock mínimo no puede ser negativo"),
  }
)
