import { apiRequest } from "./client.js";

export const processCheckout = () => {
  return apiRequest("/checkout", {
    method: "POST",
    requiresAuth: true
  })
}
