import prisma from "../../infrastructure/database/prisma.js";

export async function findByUser(userId) {
  return prisma.cart.findUnique({
    where: {
      userId
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              reference: true,
              price: true,
              brand: true
            }
          }
        }
      }
    }
  })
}

export async function findCartItem(cartId, productId) {
  return prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId,
        productId
      }
    }
  })
}

export async function createItem(cartId, productId, quantity) {
  return prisma.cartItem.create({
    data: {
      cartId,
      productId,
      quantity
    }
  })
}

export async function updateItemQuantity(itemId, quantity) {
  return prisma.cartItem.update({
    where: {
      id: itemId
    },
    data: {
      quantity
    }
  })
}

export async function deleteItem(itemId) {
  return prisma.cartItem.delete({
    where: {
      id: itemId
    }
  })
}

export async function createCart(userId) {
  return prisma.cart.create({
    data: {
      userId
    }
  })
}
