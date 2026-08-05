import InventoryRepository from './inventory.repository.js';
import { findProductById } from '../products/product.repository.js';

export async function findAllInventory() {

  try {
    return await InventoryRepository.findAllInventory();
  }catch (error) {
    throw new NotFoundError("No se encontraron productos");
  }
}

export async function patchStock(productId, data) {

  const existingProduct = await findProductById(productId);

  if (!existingProduct) {
    throw new NotFoundError("Producto no encontrado");
  }

  try {
    
    data.productId = Number(data.productId);
    data.stock = Number(data.stock);

    return await InventoryRepository.updateStock(productIdId, stock);
  }catch (error) {
    throw new ConflictError("Error al actualizar el inventario: " + error.message);
  }
}

export async function patchStock(productId, data) {

  const existingProduct = await findProductById(productId);

  if (!existingProduct) {
    throw new NotFoundError("Producto no encontrado");
  }

  try {
    
    data.productId = Number(data.productId);
    data.min_stock = Number(data.min_stock);

    return await InventoryRepository.updateStock(productIdId, min_stock);
  }catch (error) {
    throw new ConflictError("Error al actualizar el inventario: " + error.message);
  }
}
