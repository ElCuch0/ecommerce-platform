import { z } from "zod";

export const loginSchema = z.object({

  body: z.object({

    email: z
      .string()
      .email("El correo electrónico no es válido")
      .toLowerCase(),

    password: z
      .string()
      .min(1, "La contraseña es obligatoria")

  }),

  params: z.object({}),

  query: z.object({})

});

export const registerSchema = z.object({

  body: z.object({

    name: z
      .string()
      .min(2, "El nombre debe contener al menos 2 caracteres")
      .max(50, "El nombre no puede superar los 50 caracteres"),

    lastname: z
      .string()
      .min(2, "El apellido debe contener al menos 2 caracteres")
      .max(50, "El apellido no puede superar los 50 caracteres"),

    email: z
      .string()
      .email("El correo electrónico no es válido")
      .toLowerCase(),

    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),

    phone: z
      .string()
      .regex(
        /^[0-9]{10}/,
        "El teléfono debe contener 10 dígitos"
      )
      .optional()

  }),

    params: z.object({}),

    query: z.object({})

})
