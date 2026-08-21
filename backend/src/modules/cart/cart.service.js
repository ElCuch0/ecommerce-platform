import * as cartRepository from "./cart.repository.js"
import * as productRepository from "../products/product.repository.js"
import { NotFoundError } from "../../shared/errors/NotFoundError.js"
import { ConflictError } from "../../shared/errors/ConflictError.js"

export async function addToCart(userId, data) {

  const { productId, quantity } = data

  const product = await productRepository.findById(productId)

  if (!product) {
    throw new NotFoundError("Producto no encontrado")
  }

  if (!product.isActive) {
    throw new ConflictError("No se pueden agregar productos desactivados")
  }

  if (!product.category.isActive) {
    throw new ConflictError("No se pueden agregar productos con la categoría desactivada")
  }

  if (product.inventory.stock < quantity) {
    throw new ConflictError("La cantidad no puede superar el stock")
  }

  let cart = await cartRepository.findByUser(userId)

  if (!cart) {
    cart = await cartRepository.createCart(userId)
  }

  const existingItem = await cartRepository.findCartItem(cart.id, productId)

  const finalQuantity = 
    existingItem
      ? existingItem.quantity + quantity
      : quantity

  if (finalQuantity > product.stock) {
    throw new ConflictError("La cantidad solicitada supera el stock disponible")
  }

  if (existingItem) {

    await cartRepository.updateItemQuantity(
      existingItem.id,
      finalQuantity
    )

    cart = await cartRepository.findByUser(userId)

    return cart
  }

  await cartRepository.createItem(
    cart.id,
    productId,
    quantity
  )

  cart = await cartRepository.findByUser(userId)

  return cart

}

export async function getCart(userId) {

  const cart = await cartRepository.findByUser(userId)

  if (!cart) {
    throw new NotFoundError("El carrito no se encontró")
  }

  return cart
}

export async function updateQuantity(userId, productId, quantity) {

  const cart = await cartRepository.findByUser(userId)

  if (!cart) {
    throw new NotFoundError("El carrito no se encontró")
  }

  const item = cart.items.find(
    item => item.productId === productId
  )

  if (!item) {
    throw new NotFoundError("El producto no está en el carrito")
  }

  const product = await productRepository.findById(productId)

  if (!product) {
    throw new NotFoundError("El producto no existe")
  }

  if (!product.isActive) {
    throw new ConflictError("El producto esta desactivado")
  }

  if (!product.category.isActive) {
    throw new ConflictError("La categoria del producto esta desactivada")
  }

  if (quantity > product.inventory.stock) {
    throw new ConflictError("La cantidad solicitada supera el stock disponible")
  }

  const itemId = await cartRepository.findCartItem(cart.id, productId)

  return cartRepository.updateItemQuantity(itemId.id, quantity)
}

export async function removeFromCart(userId, itemId) {

  const cart = await cartRepository.findByUser(userId)

  if (!cart) {
    throw new NotFoundError("El carrito no existe")
  }

  const item = cart.items.find(
    item => item.id === itemId
  )

  if (!item) {
    throw new NotFoundError("El producto no está en el carrito")
  }

  return cartRepository.deleteItem(itemId)
}
