import InventoryService from './inventory.service.js';

export async function findAll(req, res, next) {

  try {
    return res.status(200).json({
      message: "Inventarios encontrados con éxito",
      data: await InventoryService.findAllInventory()
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
      data: await InventoryService.updateInventory(inventoryId, { productId, stock, minimumStock })
    });
  }catch (error) {
    next(error);
  }
}
