import * as inventoryRepository from './inventory.repository.js';
import * as productRepository from '../products/product.repository.js';
import { NotFoundError } from "../../shared/errors/NotFoundError.js"

export async function findAll() {
  return inventoryRepository.findAll()
}

export async function findByProductId(productId) {

  const product = await productRepository.findById(productId)

  if (!product) {
    throw new NotFoundError("El producto no existe")
  }

  console.log(product.id)

  return inventoryRepository.findByProductId(productId)
}

export async function updateStock(productId, stock) {

  const product = await productRepository.findById(productId)

  if (!product) {
    throw new NotFoundError("El registro de inventario no existe")
  }

  return inventoryRepository.updateStock(productId, stock)
}

export async function updateMinStock(productId, minimumStock) {

  const product = await productRepository.findById(productId)

  if (!product) {
    throw new NotFoundError("El registro de inventario no existe")
  }

  return inventoryRepository.updateMinStock(productId, minimumStock)
}
