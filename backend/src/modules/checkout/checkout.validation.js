import { z } from "zod";

export const createCheckoutSchema = z.object({

  checkoutId: z
    .number({invalid_type_error: "El id del checkout debe de ser un número"})
    .int("El id del checkout debe de ser entero"),

  productId: z
    .number({invalid_type_error: "El id del producto debe de ser un número"})
    .int("El id del producto debe de ser entero"),

  quantity: z
    .number({invalid_type_error: "La cantidad debe de ser un número"})
    .int("La cantidad debe de ser entera")
    .min(1, "La cantidad no puede ser menor a 1"),

  price: z
    .number({invalid_type_error: "El precio debe de ser un número"})
    .min(0, "El precio no puede tener un valor negativo"),

})
