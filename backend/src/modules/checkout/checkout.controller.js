import { createCheckout } from "./checkout.service.js"

export async function create(req, res, next){

  try {
    const {} = req.body

    return res.status(201).json({
      message: "El carrito se ha creado con éxito",
      data: await checkoutService.createCheckout({})
    })
  }catch (error) {
    next(error)
  }
}