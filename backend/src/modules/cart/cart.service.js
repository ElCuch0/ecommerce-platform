import { CartRepository } from "./cart.repository.js"
import { NotFoundError } from "../../shared/errors/NotFoundError.js"
import { ConflictError } from "../../shared/errors/ConflictError.js"

export async function findCartById(cartId){

  try {

    cartId = Number(cartId)

    return await findCartById({ cartId })
  }catch (error) {
    throw new NotFoundError("El carrito no se ha podido encontrar")
  }
}

export async function createCart(data) {

  try{

    data.cartId = Number(data.cartId)
    data.userId = Number(data.userId)

    return await CartRepository.createCart(data)
  }catch (error) {
    throw new ConflictError("No se ha podido crear el carrito")
  }
}

export async function removeCart(cartId){

  const existingCart = await CartRepository.findCartById({cartId})

  if (!existingCart){
    throw new NotFoundError("No se ha encontrado el carrito")
  }

  try {

    cartId = Number(cartId)

    return await CartRepository.deleteCart(cartId)
  }catch (error) {
    throw new ConflictError("No se ha podido eliminar el carrito")
  }
}
