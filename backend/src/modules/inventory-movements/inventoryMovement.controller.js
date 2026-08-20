import * as service from "./inventoryMovement.service.js"

export async function create(req, res, next) {

  try {

    const userId = req.user.id

    return res.status(201).json({
      success: true,
      message: "Movimiento de inventario registrado correctamente",
      data: await service.create(req.body, Number(userId))
    })
  }catch (error) {
    next(error)
  }
}

export async function findAll(req, res, next) {

  try {

    return res.status(200).json({
      success: true,
      message: "Movimientos obtenidos correctamente",
      data: await service.findAll()
    })
  }catch (error) {
    next(error)
  }
}

export async function findById(req, res, next) {

  try {

    const { id } = req.params

    return res.status(200).json({
      success: true,
      message: "Movimiento obtenido correctamente",
      data: await service.findById(Number(id))
    })
  }catch (error) {
    next(error)
  }
}

export async function findByInventoryId(req, res, next) {

  try {

    const { inventoryId } = req.params

    return res.status(200).json({
      success: true,
      message: "Movimientos obtenidos correctamente",
      data: await service.findByInventoryId(Number(inventoryId))
    })
  }catch (error) {
    next(error)
  }
}
