import * as service from "./product.service.js";

export async function findAll(req, res, next) {

  try {

    return res.status(200).json({
      message: "Productos encontrados con éxito",
      data: await findAll()
    });
  }catch (error) {
      next(error);
  }
}

export async function findById(req, res, next) {

  try {

    return res.status(200).json({
      message: "Producto encontrado con éxito",
      data: await findById(Number(req.params.id))
    });
  }catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {

  try {

    return res.status(201).json({
      message: "Producto creado correctamente",
      data: await service.create(req.body)
    });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {

  try {

    return res.status(200).json({
      message: "Producto actualizado con éxito",
      data: await service.update(Number(req.params.id), req.body)
    });
  }catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {

  try {

    return res.status(200).json({
      message: "Producto eliminado con éxito",
      data: await service.remove(Number(req.params.id))
    });
  }catch (error) {
    next(error);
  }
}
