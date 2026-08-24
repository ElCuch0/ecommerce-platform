import { z } from "zod";

export const createProductSchema = z.object({
    body: z.object({
        reference: z
            .string()
            .min(2, "La referencia debe tener al menos 2 caracteres")
            .max(50),

        name: z
            .string()
            .min(2, "El nombre debe tener al menos 2 caracteres")
            .max(100),

        description: z
            .string()
            .min(1, "La descripción es obligatoria"),

        price: z
            .number()
            .positive("El precio debe ser mayor a 0"),

        image: z
            .string()
            .url("La imagen debe ser una URL válida")
            .optional(),

        brand: z
            .string()
            .min(2, "La marca debe tener al menos 2 caracteres")
            .max(100),

        categoryId: z
            .number()
            .int()
            .positive("La categoría no es válida")
    })
});

export const updateProductSchema = z.object({

    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive()
    }),

    body: z.object({

        reference: z
            .string()
            .min(2)
            .max(50)
            .optional(),

        name: z
            .string()
            .min(2)
            .max(100)
            .optional(),

        description: z
            .string()
            .max(500)
            .optional(),

        price: z
            .number()
            .positive()
            .optional(),

        brand: z
            .string()
            .min(2)
            .max(100)
            .optional(),

        categoryId: z.coerce
            .number()
            .int()
            .positive()
            .optional()
    })

});

export const productIdSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive()
    })
})
