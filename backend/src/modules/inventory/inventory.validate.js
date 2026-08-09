import { z } from "zod";

export const updateInventorySchema = z.object({
    body: z.object({
        quantity: z
            .number()
            .int()
            .min(0, "La cantidad no puede ser negativa"),

        minimumStock: z
            .number()
            .int()
            .min(0, "El stock mínimo no puede ser negativo")
    }),

    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive()
    })
});
