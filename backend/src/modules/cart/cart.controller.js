import * as service from "./cart.service.js"

export async function addToCart(req, res, next) {

  try {

    const userId = req.user.id

    return res.status(201).json({
      success: true,
      message: "Producto agregado al carrito",
      data: await service.addToCart(Number(userId), req.body)
    })
  }catch (error) {
    next(error)
  }
}

export async function getCart(req, res, next) {

  try {

    const userId = req.user.id

    return res.status(200).json({
      success: true,
      data: await service.getCart(Number(userId))
    })
  }catch (error) {
    next(error)
  }
}

export async function updateQuantity(req, res, next) {
  
  try {

    const itemId = req.params.id

    return res.status(200).json({
      success: true,
      message: "Cantidad actualizada correctamente",
      data: await service.updateQuantity(req.user.id, Number(itemId), req.body.quantity)
    })
  }catch (error) {
    next(error)
  }
}

export async function removeFromCart(req, res, next) {

  try {

    const itemId = req.params.id

    await service.removeFromCart(req.user.id, Number(itemId))

    return res.status(200).json({
      success: true,
      message: "Producto eliminado del carrito"
    })
  }catch (error) {
    next(error)
  }
}
