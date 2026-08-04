import InventoryService from './inventory.service.js';

export async function findAll(req, res, next) {

  try {
    return res.status(200).json({
      message: "Inventarios encontrados con éxito",
      data: await ServiceInventory.findAllInventories()
    });
  }catch (error) {
      next(error);
  }
}

export async function findById(req, res, next) {

  try {
    const { inventoryId } = req.params;
    
    return res.status(200).json({
      message: "Inventario encontrado con éxito",
      data: await ServiceInventory.findInventoryById(inventoryId)
    });
  } catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {
  
  try {
    const { productId, stock, minimumStock } = req.body;

    return res.status(201).json({
      message: "Inventario creado con éxito",
      data: await ServiceInventory.createInventory({ productId, stock, minimumStock })
    });
  }catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {

  try { 
    const { inventoryId } = req.params;
    const { productId, stock, minimumStock } = req.body;

    return res.status(200).json({
      message: "Inventario actualizado con éxito",
      data: await ServiceInventory.updateInventory(inventoryId, { productId, stock, minimumStock })
    });
  }catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {

  try {
    const { inventoryId } = req.params;

    return res.status(200).json({
      message: "Inventario eliminado con éxito",
      data: await ServiceInventory.deleteInventory(inventoryId)
    });
  }catch (error) {
    next(error);
  }
}
