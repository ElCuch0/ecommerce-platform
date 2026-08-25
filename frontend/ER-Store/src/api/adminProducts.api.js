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

// --- CATEGORÍAS ---
export async function createCategory(categoryData) {
  return await apiRequest("/categories", {
    method: "POST",
    body: {
      categoryData
    },
    requiresAuth: true
  })
}

export async function updateCategory(categoryId, categoryData) {
  return await apiRequest(`/categories/${categoryId}`, {
    method: "PUT",
    body: {
      categoryData
    },
    requiresAuth: true
  })
}

export async function toggleCategoryStatus(categoryId, isActive) {
  const method = isActive ? "DELETE" : "PATCH"
  return await apiRequest(`/categories/${categoryId}`, {
    method,
    requiresAuth: true
  })
}
