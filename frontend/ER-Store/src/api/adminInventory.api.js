import { apiRequest } from "./client.js";

export async function getAllInventories() {
  return await apiRequest("/inventory", {
    method: "GET",
    requiresAuth: true
  })
}

export async function updateStock(inventoryId, stock) {
  return await apiRequest(`/inventory/${inventoryId}/stock`, {
    method: "PATCH",
    body: {
      stock
    },
    requiresAuth: true
  })
}

export async function updateStock(inventoryId, minStock) {
  return await apiRequest(`/inventory/${inventoryId}/min-stock`, {
    method: "PATCH",
    body: {
      minStock
    },
    requiresAuth: true
  })
}

export async function getInventoryMovements() {
  return await apiRequest("/inventory-movements", {
    method: "GET",
    requiresAuth: true
  })
}
