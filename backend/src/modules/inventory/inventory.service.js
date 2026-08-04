import InventoryRepository from './inventory.repository.js';

export async function findAllInventory() {

  try {
    return await InventoryRepository.findAllInventory();
  }catch (error) {
    throw new NotFoundError("No se encontraron productos");
  }
}

export async function updateInventory(inventoryId, data) {

  const existingInventory = await InventoryRepository.findInventoryById(inventoryId);

  if (!existingInventory) {
    throw new NotFoundError("Inventario no encontrado");
  }

  try {
    
    data.productId = Number(data.productId);
    data.stock = Number(data.stock);
    data.minimumStock = Number(data.minimumStock);

    return await InventoryRepository.updateInventory(inventoryId, data);
  }catch (error) {
    throw new ConflictError("Error al actualizar el inventario: " + error.message);
  }
}
