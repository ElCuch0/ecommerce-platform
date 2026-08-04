import { ConflictError, NotFoundError } from "../../../utils/errors.js";
import { createProduct, findAllProducts,  findProductById, updateProduct, deleteProduct } from "./product.repository.js";

export async function findAll(data) {

  try {
    return res.status(200).json({
      message: "Productos encontrados con éxito",
      data: await findAllProducts()
    });
  }catch (error) {
      next(error);
  }
}

export async function findById(data) {

  try {
    return res.status(200).json({
      message: "Producto encontrado con éxito",
      data: await findProductById(productId)
    });
  }catch (error) {
    next(error);
  }
}

export async function createProduct(data) {

  try {
    
    data.productId = Number(data.productId);
    data.categoryId = Number(data.categoryId);
    data.name = data.name.trim().toLowerCase();
    data.description = data.description.trim();
    data.price = Number(data.price);
    data.color = data.color.trim().toLowerCase();
    data.size = data.size.trim().toLowerCase();
    data.type = data.type.trim().toLowerCase();
    data.status = data.status.trim().toLowerCase();

    return await createProduct(data);

  }catch (error) {
    throw new ConflictError("Error al crear el producto: " + error.message);
  }
}

export async function updateProduct(productId, data) {

  const existingProduct = await findProductById(productId);

  if (!existingProduct) {
    throw new NotFoundError("Producto no encontrado");
  }

  try {
    data.categoryId = Number(data.categoryId);
    data.name = data.name.trim().toLowerCase();
    data.description = data.description.trim();
    data.price = Number(data.price);
    data.color = data.color.trim().toLowerCase();
    data.size = data.size.trim().toLowerCase();
    data.type = data.type.trim().toLowerCase();
    data.status = data.status.trim().toLowerCase();

    return await updateProduct(productId, data);
  }catch (error) {
    throw new ConflictError("Error al actualizar el producto: " + error.message);
  }
}

export async function deleteProduct(productId) {

  const existingProduct = await findProductById(productId);

  if (!existingProduct) {
    throw new NotFoundError("Producto no encontrado");
  }

  return await deleteProduct(productId);
}
