import { apiRequest } from "./client.js";

export const getCart = () => {
  return apiRequest("/cart")
}

export const addToCart = (productId, quantity) => {
  return apiRequest("/cart", {
    method: "POST",
    body: JSON.stringify({
      productId,
      quantity
    })
  })
}

export const updateCartItem = (productId, quantity) => {
  return apiRequest(`/cart/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({
      quantity
    })
  })
}

export const removeFromCart = (productId) => {
  return apiRequest(`/cart/${productId}`, {
    method: "DELETE"
  })
}
