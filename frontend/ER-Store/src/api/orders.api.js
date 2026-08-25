import { apiRequest } from "./client.js";

export async function getMyOrders() {
  return await apiRequest("/orders", {
    method: "GET",
    requiresAuth: true
  })
}

export async function getMyOrderById(id) {
  return await apiRequest(`/orders/${id}`, {
    method: "GET",
    requiresAuth: true
  })
}
