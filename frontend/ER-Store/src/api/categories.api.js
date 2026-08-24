import { apiRequest } from "./client.js";

export async function getCategories() {
  return await apiRequest("/categories", {
    method: "GET",
    requiresAuth: true
  })
}
