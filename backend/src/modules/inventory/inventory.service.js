import InventoryRepository from './inventory.repository.js';

export async function findAllInventories() {

  try {
    return await InventoryRepository.findAllInventories();
  }catch (error) {
    throw new NotFoundError("No se encontraron inventarios");
  }
}

export async function findInventoryById(inventoryId) {

  try {
    return await InventoryRepository.findInventoryById(inventoryId);
  }catch (error) {
    throw new NotFoundError("Inventario no encontrado");
  }
}

export async function createInventory(data) {
  try {

    data.productId = Number(data.productId);
    data.stock = Number(data.stock);
    data.minimumStock = Number(data.minimumStock);

    return await InventoryRepository.createInventory(data);
  }catch (error) {
    throw new ConflictError("Error al crear el inventario: " + error.message);
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

export async function deleteInventory(inventoryId) {
  try {
    return await InventoryRepository.deleteInventory(inventoryId);
  }catch (error) {
    throw new ConflictError("Error al eliminar el inventario: " + error.message);
  }
}
