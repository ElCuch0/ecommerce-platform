import { apiRequest } from "./client.js";

export async function login(credentials) {

  console.log("LOGIN REQUEST: ", credentials)

  const response = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    requiresAuth: false
  })

  console.log("LOGIN RESPONSE: ", response)

  return response
}

export async function register(credentials) {
  
  const response = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
    requiresAuth: false
  })

  return response
}
