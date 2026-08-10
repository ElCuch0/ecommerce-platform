import prisma from "../../infrastructure/database/prisma.js";

export async function findAll() {
  return prisma.inventory.findMany({
    include: {
      product: true
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

export async function updateStock(id, stock) {
  return prisma.inventory.update({ 
    where: {
      id: id
    },
    data: {
      stock
    },
    include: {
      product: true
    }
  })
}

export async function updateMinStock(id, minimumStock) {
  return prisma.inventory.update({
    where: {
      id: id
    },
    data: {
      minimumStock
    },
    include: {
      product: true
    }
  })
}
