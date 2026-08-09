import { z } from "zod";

export const categorySchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(2, "El nombre debe tener al menos 2 caracteres")
            .max(100, "El nombre no puede superar los 100 caracteres")
            .trim(),
        
        description: z
          .string()
          .trim()
          .optional()
    })
});
