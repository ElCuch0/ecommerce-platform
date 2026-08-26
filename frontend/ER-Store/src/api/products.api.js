import { apiRequest } from "./client.js";

export const getProducts = () => {
  return apiRequest("/products", {
    method: "GET",
    requiresAuth: false
  })
}

export const getAdminProducts = () => {
  return apiRequest("/products/admin", {
    method: "GET",
    requiresAuth: true
  })
}
