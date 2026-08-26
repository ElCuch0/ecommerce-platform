import { apiRequest } from "./client.js";

export async function getAllOrders() {
  return await apiRequest("/orders/all", {
    method: "GET",
    requiresAuth: true
  })
}

export async function updateOrderStatus(orderId, status) {
  return await apiRequest(`/orders/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    requiresAuth: true
  })
}
