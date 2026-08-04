import CartService from "./cart.service.js"

export async function findById(req, res, next) {

  try {

    const { cartId } = req.params

    return res.status(200).json({
      message: "El carrito se ha encontrado con éxito",
      data: await CartService.findCartById({ cartId })
    })
  }catch (error) {
    next(error)
  }
}

export async function create(req, res, next) {

  try {

    const { cartID, cartId } = req.body;

    return res.status(201).json({
      message: "El carrito se ha creado con éxito",
      data: await CartService.createCart({ cartId, cartId })
    })
  }catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {

  try {

    const { cartId } = req.params;

    return res.status(200).json({
      message: "El carrito se eliminó con éxito",
      data: await CartService.removeCart({ cartId })
    })
  }catch (error) {
      next(error)
  }
}
