import * as service from "./checkout.service.js"

export async function checkout(req, res, next) {

  try {

    const userId = req.user.id

    return res.status(201).json({
      success: true,
      message: "Compra realizada con éxito",
      data: await service.checkout(Number(userId))
    })
  }catch (error) {
    next(error)
  }
}
