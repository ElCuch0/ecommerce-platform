import { success } from "zod";
import * as service from "./categories.service.js"

export async function findAll(req, res, next) {

  try {
    return res.status(200).json({
      success: true,
      message: "Categorías encontradas con éxito",
      data: await service.findAll()
    });
  } catch (error) {
    next(error);
  }
}

export async function findById(req, res, next) {
  
  try {

    const { id } = req.params

    return res.status(200).json({
      success: true,
      message: "Categoría encontrada correctamente",
      data: await service.findById(Number(id))
    })
  }catch (error) {
    next(error)
  }
}

export async function create(req, res, next) {
  
  try {
    
    return res.status(201).json({
      success: true,
      message: "La categoría se ha creado correctamente",
      data: await service.create(req.body)
    })
  }catch (error) {
    next(error)
  }
}

export async function update(req, res, next) {
  
  try {

    const id = req.params.id

    return res.status(200).json({
      success: true,
      message: "Categoria actualizada con éxito",
      data: await service.update(Number(id), req.body)
    })
  }catch (error) {
    next(error)
  }
}

export async function deactivate(req, res, next) {
  
  try {

    const { id } = req.params

    return res.status(200).json({
      success: true,
      message: "Categoria desactivada correctamente",
      data: await service.deactivate(Number(id))
    })
  }catch (error) {
    next(error)
  }
}

export async function activate(req, res, next) {
  
  try {

    const { id } = req.params

    return res.status(200).json({
      success: true,
      message: "Categoria activada correctamente",
      data: await service.activate(Number(id))
    })
  }catch (error) {
    next(error)
  }
}
