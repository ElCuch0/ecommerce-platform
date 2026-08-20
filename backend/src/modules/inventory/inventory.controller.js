import { success } from 'zod';
import * as service from './inventory.service.js';

export async function findAll(req, res, next) {

  try {
    return res.status(200).json({
      success: true,
      message: "Inventarios encontrados correctamente",
      data: await service.findAll()
    });
  }catch (error) {
      next(error);
  }
}

export async function findByProductId(req, res, next) {

  try {

    const productId = req.params.productId

    return res.status(200).json({
      success: true,
      message: "Inventario encontrado correctamente",
      data: await service.findByProductId(Number(productId))
    })
  }catch (error) {
    next(error)
  }
}

export async function updateStock(req, res, next) {

  try { 

    const { productId } = req.params;
    const { stock } = req.body;

    return res.status(200).json({
      success: true,
      message: "Stock actualizado correctamente",
      data: await service.updateStock(Number(productId), Number(stock))
    });
  }catch (error) {
    next(error);
  }
}

export async function updateMinStock(req, res, next) {

  try { 
    const { productId } = req.params;
    const { minimumStock } = req.body;

    return res.status(200).json({
      success: true,
      message: "Inventario actualizado con éxito",
      data: await service.updateMinStock(Number(productId), Number(minimumStock))
    });
  }catch (error) {
    next(error);
  }
}
