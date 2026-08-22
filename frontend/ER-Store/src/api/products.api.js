import { apiRequest } from "./client.js";

export const getProducts = () => {
  return apiRequest("/products")
}

export const getProductById = (id) => {
  return apiRequest(`/products/${id}`)
}
