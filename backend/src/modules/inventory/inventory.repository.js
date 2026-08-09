import { prisma } from "prisma";

export async function findAllInventory() {
  return prisma.inventory.findMany()
}

export async function updateStock(id, data) {
  return prisma.inventory.update({ 
    where: { id },
    data 
  })
}
