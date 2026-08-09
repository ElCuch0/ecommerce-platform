import * as inventoryRepository from './inventory.repository.js';
import * as productRepository from '../products/product.repository.js';

export async function findAllInventory() {

  try {
    return await inventoryRepository.findAllInventory();
  }catch (error) {
    throw new NotFoundError("No se encontraron productos");
  }
}

export async function patchStock(id, data) {

  const existingProduct = await productRepository.findProductById(id);

  if (!existingProduct) {
    throw new NotFoundError("Producto no encontrado");
  }

  try {
    
    data.id = Number(data.id);
    data.stock = Number(data.stock);

    return await inventoryRepository.updateStock(productIdId, stock);
  }catch (error) {
    throw new ConflictError("Error al actualizar el inventario: " + error.message);
  }
}

export async function patchMinimumStock(id, data) {

  const existingProduct = await productRepository.findProductById(id);

  if (!existingProduct) {
    throw new NotFoundError("Producto no encontrado");
  }

  try {
    
    data.id = Number(data.id);
    data.min_stock = Number(data.min_stock);

    return await inventoryRepository.updateStock(productIdId, min_stock);
  }catch (error) {
    throw new ConflictError("Error al actualizar el inventario: " + error.message);
  }
}
