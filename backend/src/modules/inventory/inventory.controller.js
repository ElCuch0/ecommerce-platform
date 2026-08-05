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

export async function patchStock(req, res, next) {

  try { 
    const productId = req.params;
    const stock = req.body;

    return res.status(200).json({
      message: "Inventario actualizado con éxito",
      data: await InventoryService.patchStock(productId, stock)
    });
  }catch (error) {
    next(error);
  }
}

export async function patchMinStock(req, res, next) {

  try { 
    const productId = req.params;
    const min_stock = req.body;

    return res.status(200).json({
      message: "Inventario actualizado con éxito",
      data: await InventoryService.patchStock(productId, min_stock)
    });
  }catch (error) {
    next(error);
  }
}
