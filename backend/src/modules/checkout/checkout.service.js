import prisma from "../../infrastructure/database/prisma.js"
import { NotFoundError } from "../../shared/errors/NotFoundError.js"
import { ConflictError } from "../../shared/errors/ConflictError.js"

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

      const inventory = await tx.inventory.findUnique({
        where: {
          productId: item.productId
        }
      })

      if (!inventory) {
        throw new NotFoundError(`El producto ${item.productId} no tiene inventario`)
      }

      if (!product.isActive) {
        throw new ConflictError(`El producto ${product.name} esta desactivado`)
      }

      if (!product.category.isActive) {
        throw new ConflictError(`La categoría del producto ${product.name} esta desactivada`)
      }

      if (inventory.stock < item.quantity) {
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

    for (const item of cart.items) {

      const inventory = await tx.inventory.findUnique({
        where: {
          productId: item.productId
        }
      })

      await tx.inventory.update({
        where: {
          productId: item.productId
        },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      })

      await tx.inventoryMovement.create({
        data: {
          inventory: {
            connect: {
              id: inventory.id
            }
          },
          user: {
            connect: {
              id: userId
            }
          },
          type: "EXIT",
          quantity: item.quantity,
          reason: "Compra realizada"
        }
      })
    }

    await tx.cartItem.deleteMany({
      where: {
        cartId: cart.id
      }
    })

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
        items: true
      }
    })

    const invoiceNumber = `FAC-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900) + 100}`

    const invoice = await tx.invoice.create({
      data: {
        order: {
          connect: {
            id: order.id
          }
        },
        invoiceNumber,
        total: order.total
      }
    })

    return {
      order,
      invoice
    }

  })
  
}
