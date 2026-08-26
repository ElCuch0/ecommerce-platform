import { apiRequest } from "./client.js";

export async function getAllInventories() {
  return await apiRequest("/inventory", {
    method: "GET",
    requiresAuth: true
  })
}

export async function updateStock(productId, stock) {
  return await apiRequest(`/inventory/${productId}/stock`, {
    method: "PATCH",
    body: JSON.stringify({ stock: Number(stock) }),
    requiresAuth: true
  })
}

export async function updateMinimumStock(productId, minimumStock) {
  return await apiRequest(`/inventory/${productId}/min-stock`, {
    method: "PATCH",
    body: JSON.stringify({ minimumStock: Number(minimumStock) }),
    requiresAuth: true
  })
}

export async function getInventoryMovements() {
  return await apiRequest("/inventory-movements", {
    method: "GET",
    requiresAuth: true
  })
}
