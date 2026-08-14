import {z} from "zod"

export const invoiceIdSchema = z.object({

  body: z.object({}),

  params: z.object({
    id: z.coerce
      .number()
      .int("El id del invoice debe ser entero")
      .positive("El id del invoice debe ser mayor a 0")
  }),

  query: z.object({})
})
