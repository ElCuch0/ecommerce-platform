import { apiRequest } from "./client.js";

export const checkout = () => {
  return apiRequest("/checkout", {
    method: "POST"
  })
}
