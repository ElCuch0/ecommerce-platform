import { ConflictError } from "../../shared/errors/Conflicterror.js";
import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import * as productRepository from "./product.repository.js";
import * as categoryRepository from "../categories/categories.repository.js"

export async function findAll() {
  return await productRepository.findAll()
}

export async function findById(id) {

  const product = await productRepository.findById(id)

  if (!product) {
    throw new NotFoundError("Producto no encontrado")
  }

  return product

}

export async function create(data) {

  const category = await categoryRepository.findById(data.categoryId)

  if (!category) {
    throw new NotFoundError("La categoría indicada no existe")
  }

  const product = await productRepository.findByReference(data.reference)

  if (product) {
    throw new ConflictError("Ya existe un producto con esa referencia")
  }

  return productRepository.create(data)

}

export async function update(productId, data) {

  const existingProduct = await productRepository.findById(productId);

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

    return await productRepository.update(productId, data);
  }catch (error) {
    throw new ConflictError("Error al actualizar el producto: " + error.message);
  }
}

export async function remove(productId) {

  const existingProduct = await productRepository.findById(productId);

  if (!existingProduct) {
    throw new NotFoundError("Producto no encontrado");
  }

  return await productRepository.remove(productId);
}
