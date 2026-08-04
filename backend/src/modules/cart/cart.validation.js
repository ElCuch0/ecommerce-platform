import { z } from "zod";

export const createCartSchema = z.object({

  cartId: z
    .number({ invalid_type_error: "El ID del carrito debe ser un número" })
    .int("El ID del carrito debe ser un número entero"),

  userId: z
    .number({ invalid_type_error: "El ID del usuario debe ser un número" })
    .int("El ID del usuario debe ser un número entero"),
    
})
