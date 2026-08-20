import { z } from "zod"

export const createInventoryMovementSchema = z.object({
  body: z.object({
    inventoryId: z.coerce
      .number()
      .int()
      .positive(),

    type: z.enum([
      "ENTRY",
      "EXIT",
      "ADJUSTMENT"
    ]),

    quantity: z.coerce
      .number()
      .int(),
      
    reason: z
      .string()
      .min(3, "El motivo debe contener al menos 3 caracteres")
      .max(255)
  })
})
