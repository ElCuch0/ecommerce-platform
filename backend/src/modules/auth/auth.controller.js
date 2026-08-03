import { registerUser, loginUser } from "./auth.service.js";

export async function register(req, res, next){

  try {
    const { name, lastname, email, password, telephone } = req.body;

    return res.status(201).json({
      message: "Usuario registrado con éxito",
      data: await registerUser({ name, lastname, email, password, telephone })
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next){

  try {
    const { email, password } = req.body;

    return res.status(200).json({
      message: "Usuario logueado con éxito",
      data: await loginUser({ email, password })
    });
  } catch (error) {
    next(error);
  }
}
