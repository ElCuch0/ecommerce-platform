import * as repository from "./inventoryMovement.repository.js"
import * as inventoryRepository from "../inventory/inventory.repository.js"
import { NotFoundError } from "../../shared/errors/NotFoundError.js"

export async function create(data, userId) {

  return repository.create({
    ...data,
    userId
  })
}

export async function findAll() {
  return repository.findAll()
}

export async function findById(id) {
  
  const movement = await repository.findById(id)

  if (!movement) {
    throw new NotFoundError("El movimiento de inventario no existe")
  }

  return movement
}

export async function findByInventoryId(inventoryId) {

  const inventory = await inventoryRepository.findById(inventoryId)

  if (!inventory) {
    throw new NotFoundError("El inventario no existe")
  }

  return repository.findByInventoryId(inventoryId)
}
