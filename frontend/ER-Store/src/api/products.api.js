import { apiRequest } from "./client.js";

export const getProducts = (search = "") => {
  const query = search.trim() ? `?search=${encodeURIComponent(search.trim())}` : "";

  return apiRequest(`/products${query}`, {
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
