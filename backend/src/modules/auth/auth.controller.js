import * as service from "./auth.service.js"

export async function register(req, res, next){

  try {

    const { name, lastname, email, password, phone } = req.body

    return res.status(201).json({
      message: "Usuario registrado con éxito",
      data: await service.register({ name, lastname, email, password, phone })
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next){

  try {

    const { email, password } = req.body

    return res.status(200).json({
      message: "Usuario logueado con éxito",
      data: await service.login({ email, password })
    });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res, next) {

  try {

    return res.status(200).json({
      message: "Usuario obtenido correctamente",
      data: await service.getCurrentUser(req.user.id)
    })
  }catch (error) {
    next(error)
  }
}

export async function refresh(req, res, next) {
  
  try {

  }catch (error) {
    next(error)
  }
}

export async function logout(req, res, next) {

  try {

  }catch (error) {
    next(error)
  }
}
