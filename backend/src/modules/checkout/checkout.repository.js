import prisma from "../../infrastructure/database/prisma.js"

export async function executeCheckout(userId){
  return prisma.$transaction(async (tx) => {

    const cart = await tx.cart.findUnique({
      where: {
        userId
      },
      include: {
        items: {
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
      throw new Error("El usuario no tiene un carrito")
    }

    if (cart.items.length === 0) {
      throw new Error("El carrito esta vacío")
    }
  })
}
