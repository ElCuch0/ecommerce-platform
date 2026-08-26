import { apiRequest } from "./client.js";

export async function createCategory(categoryData) {
  return await apiRequest("/categories", {
    method: "POST",
    body: JSON.stringify(categoryData),
    requiresAuth: true
  });
}

export async function updateCategory(categoryId, categoryData) {
  return await apiRequest(`/categories/${categoryId}`, {
    method: "PUT",
    body: JSON.stringify(categoryData),
    requiresAuth: true
  });
}

export async function toggleCategoryStatus(categoryId, isActive) {
  return await apiRequest(`/categories/${categoryId}`, {
    method: isActive ? "DELETE" : "PATCH",
    requiresAuth: true
  });
}
