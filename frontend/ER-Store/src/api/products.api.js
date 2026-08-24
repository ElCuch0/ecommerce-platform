import { apiRequest } from "./client.js";

export const getProducts = () => {
  return apiRequest("/products", {
    method: "GET",
    requiresAuth: false
  })
}
