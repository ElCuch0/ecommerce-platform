import { prisma } from "prisma";

export async function findAllInventory() {
  return prisma.inventory.findMany()
}

export async function updateInventory(inventoryId, data) {
  return prisma.inventory.update({ 
    where: { inventoryId },
    data 
  })
}
