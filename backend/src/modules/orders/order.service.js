import * as repository from "./order.repository.js"
import { NotFoundError } from "../../shared/errors/NotFoundError.js"
import { ConflictError } from "../../shared/errors/ConflictError.js"

export async function getMyOrders(userId) {
  return await repository.findByUserId(userId)
}

export async function getMyOrderById(userId, orderId) {

  const order = await repository.findById(orderId)

  if (!order) {
    throw new NotFoundError("La orden no existe")
  }

  if (order.userId !== userId) {
    throw new NotFoundError("La orden no existe")
  }

  return order
}

export async function getAllOrders() {
  return await repository.findAll()
}

export async function updateOrderStatus(orderId, status) {

  const order = await repository.findById(orderId)

  if (!order) {
    throw new NotFoundError("La orden no existe")
  }

  if (order.status === "CANCELLED") {
    throw new ConflictError("No se puede modificar una orden cancelada")
  }

  if (order.status === "DELIVERED") {
    throw new ConflictError("No se puede modificar una orden entregada")
  }

  return await repository.updateStatus(orderId, status)
}
