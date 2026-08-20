import { z } from "zod";

export const createCartItemSchema = z.object({

    body: z.object({
        productId: z.coerce
            .number()
            .int("El productId debe ser un entero")
            .positive("El productId debe ser mayor que 0"),

        quantity: z.coerce
            .number()
            .int("La cantidad debe ser un entero")
            .positive("La cantidad debe ser mayor que 0")
    }).strict()
});

export const updateCartItemSchema = z.object({

    body: z.object({
        quantity: z.coerce
            .number()
            .int("La cantidad debe ser un entero")
            .positive("La cantidad debe ser mayor que 0")
    }).strict(),

    params: z.object({
        id: z.coerce
            .number()
            .int("El id debe ser un entero")
            .positive("El id debe ser mayor que 0")
    })
});
