import {z} from "zod"

export const orderIdSchema = z.object({

  params: z.object({
    id: z.coerce
      .number()
      .int("El id del usuario debe ser un entero")
      .positive("El id debe ser mayor a 0")
  })
})

export const updateOrderStatusSchema = z.object({

  body: z.object({
    status: z.enum([
      "PENDING",
      "PAID",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED"
    ])
  }),

  params: z.object({
    id: z.coerce
      .number()
      .int("El id del usuario debe ser un entero")
      .positive("El id debe ser mayor a 0")
  }),

  query: z.object({})
})
