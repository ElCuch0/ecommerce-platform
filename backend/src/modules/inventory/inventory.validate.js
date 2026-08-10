import { z } from "zod";

export const updateStockSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive("El id debe ser un número positivo")
    }),

    body: z.object({
        stock: z
            .number()
            .int()
            .min(0, "El stock no puede ser negativo")
    })
});

export const updateMinStockSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive("El id debe ser un número positivo")
    }),

    body: z.object({
        minimumStock: z
            .number()
            .int()
            .min(0, "El stock minimo no puede ser negativo")
    })
})
