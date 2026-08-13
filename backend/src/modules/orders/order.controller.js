import * as service from "./order.service.js"

export async function getMyOrders(req, res, next) {

  try {

    const userId = req.user.id

    return res.status(200).json({
      success: true,
      data: await service.getMyOrders(Number(userId))
    })
  }catch (error) {
    next(error)
  }
}

export async function getMyOrderById(req, res, next) {

  try {

    const userId = req.user.id
    const orderId = req.params.id

    return res.status(200).json({
      success: true,
      data: await service.getMyOrderById(Number(userId), Number(orderId))
    })
  }catch (error) {
    next(error)
  }
}

export async function getAllOrders(req, res, next) {

  try {
    
    return res.status(200).json({
      success: true,
      data: await service.getAllOrders()
    })
  }catch (error) {
    next(error)
  }
}

export async function updateOrderStatus(req, res, next) {

  try {

    const orderId = req.params.id
    const { status } = req.body

    return res.status(200).json({
      success: true,
      message: "Estado de la orden actualizado correctamente",
      data: await service.updateOrderStatus(Number(orderId), status)
    })
  }
}
