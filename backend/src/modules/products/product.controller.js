import { success } from "zod";
import * as service from "./product.service.js";

export async function findAll(req, res, next) {

  try {

    return res.status(200).json({
      success: true,
      message: "Productos encontrados con éxito",
      data: await service.findAll()
    });
  }catch (error) {
      next(error)
  }
}

export async function findById(req, res, next) {

  try {

    return res.status(200).json({
      success: true,
      message: "Producto encontrado con éxito",
      data: await service.findById(Number(req.params.id))
    });
  }catch (error) {
    next(error)
  }
}

export async function create(req, res, next) {

  try {

    return res.status(201).json({
      success: true,
      message: "Producto creado correctamente",
      data: await service.create(req.body)
    });
  } catch (error) {
    next(error)
  }
}

export async function update(req, res, next) {

  try {

    const { id } = req.params

    return res.status(200).json({
      success: true,
      message: "Producto actualizado con éxito",
      data: await service.update(Number(id), req.body)
    });
  }catch (error) {
    next(error);
  }
}

export async function deactivate(req, res, next) {

  try {

    const { id } = req.params

    return res.status(200).json({
      success: true,
      message: "Producto desactivado correctamente",
      data: await service.deactivate(Number(id))
    });
  }catch (error) {
    next(error)
  }
}

export async function activate(req, res, next) {

  try {

    const { id } = req.params

    return res.status(200).json({
      success: true,
      message: "Producto activado correctamente",
      data: await service.activate(Number(id))
    })
  }catch (error) {
    next(error)
  }
}
