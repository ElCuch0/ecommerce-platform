import prisma from "../../infrastructure/database/prisma.js"
import * as repository from "./checkout.repository.js"
import { NotFoundError } from "../../shared/errors/NotFoundError.js"
import { ConflictError } from "../../shared/errors/ConflictError.js"
import { zhCN } from "zod/v4/locales"

export async function checkout(userId){

  return await prisma.$transaction(async (tx) => {

    const cart = await tx.cart.findUnique({
      where: {
        userId
      },
      include: {
        items:{
          include: {
            product: {
              include: {
                category: true
              }
            }
          }
        }
      }
    })

    if (!cart) {
      throw new NotFoundError("El carrito no existe")
    }

    if (cart.items.length === 0) {
      throw new ConflictError("Np se puede realizar el checkout de un carrito vacio")
    }

    let total = 0

    const orderItems = []

    for (const item of cart.items) {

      const product = item.product

      if (!product) {
        throw new NotFoundError(`El producto ${item.productId} no existe`)
      }

      if (!product.isActive) {
        throw new ConflictError(`El producto ${product.name} esta desactivado`)
      }

      if (!product.category.isActive) {
        throw new ConflictError(`La categoría del producto ${product.name} esta desactivada`)
      }

      if (product.stock < item.quantity) {
        throw new ConflictError(`Stock insuficiente para el producto ${product.name}`)
      }

      const unitPrice = Number(product.price)
      const subtotal = unitPrice * item.quantity

      total += subtotal

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        unitPrice,
        subtotal
      })
    }

    const order = await tx.order.create({
      data: {
        userId,
        total,
        status: "PENDING",

        items: {
          create: orderItems
        }
      },
      include: {
        item: true
      }
    })

    for (const item of cart.items) {

      await tx.product.update({
        where: {
          id: item.productId
        },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      })

      await tx.inventoryMovement.create({
        data: {
          productId: item.productId,
          userId,
          type: "EXIT",
          quantity: item.quantity
        }
      })
    }

    await tx.cartItem.deleteMany({
      where: {
        cartId: cart.id
      }
    })

    return order
  })
}
