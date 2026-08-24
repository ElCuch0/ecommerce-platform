import { apiRequest } from "./client.js";

export async function getCart(){
  return apiRequest("/cart", {
    method: "GET",
    requiresAuth: true
  })
}

export async function addToCart({ productId, quantity = 1 }){
  return apiRequest("/cart", {
    method: "POST",
    body: {
      productId,
      quantity
    },
    requiresAuth: true
  })
}

export async function updateCartItem(productId, quantity){
  return apiRequest(`/cart/${productId}`, {
    method: "PATCH",
    body: {
      quantity
    },
    requiresAuth: true
  })
}

export async function removeFromCart(productId){
  return apiRequest(`/cart/${productId}`, {
    method: "DELETE",
    requiresAuth: true
  })
}
