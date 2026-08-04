import { prisma } from "prisma";

export async function findAllInventories() {
  return prisma.inventory.findMany()
}

export async function findInventoryById(inventoryId) {
  return prisma.inventory.findUnique({ where: {inventoryId} })
}

export async function createInventory(data) {
  return prisma.inventory.create({ data });
}

export async function updateInventory(inventoryId, data) {
  return prisma.inventory.update({ 
    where: { inventoryId },
    data 
  })
}

export async function deleteInventory(invetoryId) {
  return prisma.inventory.delete({ where: { invetoryId } })
}
