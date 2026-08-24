import {z} from "zod"

export const updateUserSchema = z.object({

  params: z.object({
    id: z.coerce
      .number()
      .int("El id del usuario debe ser entero")
      .positive("El id del usuario debe ser mayor a 0"),
  }),

  body: z.void()

})
