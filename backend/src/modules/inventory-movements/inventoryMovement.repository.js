import prisma from "../../infrastructure/database/prisma.js";

export async function create({
  inventoryId,
  type,
  quantity,
  reason,
  userId
}) {

  return prisma.$transaction(async (tx) => {

    const inventory = await tx.inventory.findUnique({
      where: {
        id: inventoryId
      }
    })

    if (!inventory) {
      const error = new Error(
        "El inventario no existe"
      )

      error.statusCode = 404

      throw error
    }

    let newQuantity = inventory.stock

    if (type === "ENTRY") {

      if (quantity < 0) {
        const error = new Error(
          "La cantidad no puede ser menor a 0"
        )

        error.statusCode = 400

        throw error
      }

      newQuantity += quantity
    }

    if (type === "EXIT") {

      if (quantity < 0) {
        const error = new Error(
          "La cantidad no puede ser menor a 0"
        )

        error.statusCode = 400

        throw error
      }
      
      newQuantity -= quantity
    }

    if (type === "ADJUSTMENT") {
      newQuantity += quantity
    }

    if (newQuantity < 0) {
      const error = new Error(
        "El quantity no puede quedar en negativo"
      )

      error.statusCode = 409

      throw error
    }

    const updatedInventory = await tx.inventory.update({
      where: {
        id: inventoryId
      },
      data: {
        stock: newQuantity
      }
    })

    const movement = await tx.inventoryMovement.create({
      data: {
        inventoryId,
        type,
        quantity,
        reason,
        userId
      }
    })

    return {
      movement,
      inventory: updatedInventory
    }
  })
}

export async function findAll() {
  return prisma.inventoryMovement.findMany({
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      type: true,
      quantity: true,
      reason: true,
      createdAt: true,

      inventory: {
        select: {
          id: true,

          product: {
            select: {
              id: true,
              name: true,
              reference: true
            }
          }
        }
      },

      user: {
        select: {
          id: true,
          name: true,
          lastname: true
        }
      }
    }
  })
}

export async function findById(id) {

  return prisma.inventoryMovement.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      type: true,
      quantity: true,
      reason: true,
      createdAt: true,

      inventory: {
        select: {
          id: true,

          product: {
            select: {
              id: true,
              name: true,
              reference: true
            }
          }
        }
      },

      user: {
        select: {
          id: true,
          name: true,
          lastname: true
        }
      }
    }
  })
}

export async function findByInventoryId(inventoryId) {
  
  return prisma.inventoryMovement.findMany({
    where: {
      inventoryId
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      user:true
    }
  })
}
