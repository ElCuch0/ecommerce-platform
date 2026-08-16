import * as service from "./user.service.js"

export async function findAll(req, res, next) {

  try {

    return res.status(200).json({
      message: "Se han encontrado los usuarios con éxito",
      data: await service.findAll()
    })
  }catch (error) {
    next(error)
  }
}

export async function findById(req, res, next) {

  try {

    const id = req.params.id

    return res.status(200).json({
      message: "Se ha encontrado el usuario",
      data: await service.findById(Number(id))
    })
  }catch (error) {
    next(error)
  }
}

export async function activate(req, res, next) {

  try {

    const id = req.params.id

    return res.status(201).json({
      message: "Se ha activado el usuario",
      data: await service.activate(Number(id))
    })
  }catch (error) {
    next(error)
  }
}

export async function deactivate(req, res, next) {

  try {

    const id = req.params.id

    return res.status(200).json({
      message: "Se ha desactivado el usuario",
      data: await service.deactivate(Number(id))
    })
  }catch (error) {
    next(error)
  }
}
