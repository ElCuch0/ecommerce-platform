import prisma from "../../infrastructure/database/prisma.js";

export async function findAll() {
  return prisma.inventory.findMany({
    include: {
      product: {
        include: {
          category: {
            select: {
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      id: "desc"
    }
  })
}

export async function findById(id) {
  return prisma.inventory.findUnique({
    where: {
      id: id
    }
  })
}

export async function findByProductId(productId) {
  return prisma.inventory.findUnique({
    where: {
      productId
    }
  })
}

export async function createStock(productId) {
  return prisma.inventory.create({
    productId,
    stock: 0,
    minimumStock: 0
  })
}

export async function updateStock(productId, stock) {
  return prisma.inventory.update({ 
    where: {
      productId
    },
    data: {
      stock
    },
    include: {
      product: true
    }
  })
}

export async function updateMinStock(productId, minimumStock) {
  return prisma.inventory.update({
    where: {
      productId
    },
    data: {
      minimumStock
    },
    include: {
      product: true
    }
  })
}
