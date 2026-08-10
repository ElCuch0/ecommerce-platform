import * as service from './inventory.service.js';

export async function findAll(req, res, next) {

  try {
    return res.status(200).json({
      message: "Inventarios encontrados correctamente",
      data: await service.findAll()
    });
  }catch (error) {
      next(error);
  }
}

export async function updateStock(req, res, next) {

  try { 

    const { id } = req.params;
    const { stock } = req.body;

    return res.status(200).json({
      message: "Stock actualizado correctamente",
      data: await service.updateStock(Number(id), Number(stock))
    });
  }catch (error) {
    next(error);
  }
}

export async function updateMinStock(req, res, next) {

  try { 
    const { id } = req.params;
    const { minimumStock } = req.body;

    return res.status(200).json({
      message: "Inventario actualizado con éxito",
      data: await service.updateMinStock(Number(id), Number(minimumStock))
    });
  }catch (error) {
    next(error);
  }
}
