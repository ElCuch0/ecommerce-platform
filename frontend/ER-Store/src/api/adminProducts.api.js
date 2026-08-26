import { apiRequest } from "./client.js";

export async function createProduct(productData) {
  return await apiRequest("/products", {
    method: "POST",
    body: JSON.stringify(productData),
    requiresAuth: true
  })
}

export async function updateProduct(productId, productData) {
  return await apiRequest(`/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify(productData),
    requiresAuth: true
  })
}

export async function deleteProduct(productId) {
  return await apiRequest(`/products/${productId}`, {
    method: "DELETE",
    requiresAuth: true
  })
}

export async function toggleProductStatus(productId, isActive) {
  return await apiRequest(`/products/${productId}`, {
    method: isActive ? "DELETE" : "PATCH",
    requiresAuth: true
  })
}
