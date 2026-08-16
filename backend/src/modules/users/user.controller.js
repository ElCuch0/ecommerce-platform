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

    const id = req.params

    return res.status(200).json({
      message: "Se ha encontrado el usuario",
      data: await service.findById(id)
    })
  }catch (error) {
    next(error)
  }
}

export async function update(req, res, next) {

  try {

    const id = req.params
    const data = req.body

    return res.status(201).json({
      message: "Se ha actualizado el usuario",
      data: await service.update(id, data)
    })
  }catch (error) {
    next(error)
  }
}

export async function remove(req, res, next) {

  try {

    const { id } = req.params

    return res.status(200).json({
      message: "Se ha eliminado el usuario",
      data: await service.remove(Number(id))
    })
  }catch (error) {
    next(error)
  }
}
