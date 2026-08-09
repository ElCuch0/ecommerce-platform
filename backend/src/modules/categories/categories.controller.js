import { serialize } from "node:v8";
import * as service from "./categories.service.js"

export async function findAll(req, res, next) {
  try {
    return res.status(200).json({
      message: "Categorías encontradas con éxito",
      data: await findAll()
    });
  } catch (error) {
    next(error);
  }
}

export async function findById(req, res, next) {
  try {
    const { id } = req.params;
    const category = await findById(id);
    if (!category) {
      return res.status(404).json({
        message: "Categoría no encontrada"
      });
    }
    return res.status(200).json({
      message: "Categoría encontrada con éxito",
      data: category
    });
  } catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {
  
  try {
    
    return res.status(201).json({
      message: "La categoría se ha creado correctamente",
      data: await service.create(req.body)
    })
  }catch (error) {
    next(error)
  }
}

export async function update(req, res, next) {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    const category = await update(categoryId, { name, description });
    return res.status(200).json({
      message: "Categoría actualizada con éxito",
      data: category
    });
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    const { categoryId } = req.params;
    const category = await remove(categoryId);
    return res.status(200).json({
      message: "Categoría eliminada con éxito",
      data: category
    });
  } catch (error) {
    next(error);
  }
}
