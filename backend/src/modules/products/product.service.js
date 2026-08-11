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

export async function update(id, data) {

  if (data.categoryId) {

    const category = await categoryRepository.findById(data.categoryId)

    if (!category) {
      throw new NotFoundError("La categoría indicada no existe")
    }
  }

  const product = await productRepository.findById(id);

  if (!product) {
    throw new NotFoundError("Producto no encontrado");
  }

  if (data.reference) {

    const existingProduct = await productRepository.findByReference(data.reference)
    
    if (
      existingProduct && existingProduct.id !== id
    ) {
      throw new ConflictError("La referencia ya esta asociada a otro producto")
    }
  }

  return productRepository.update(id, data)
}

export async function deactivate(id) {

  const product = await productRepository.findById(id)

  if (!product) {
    throw new NotFoundError("Producto no encontrado")
  }

  if (!product.isActive) {
    throw new ConflictError("El producto ya está inactivo")
  }

  return productRepository.deactivate(id)
}

export async function activate(id) {

  const product = await productRepository.findById(id)

  if (!product) {
    throw new NotFoundError("Producto no encontrado")
  }

  if (product.isActive) {
    throw new ConflictError("El producto ya está activo")
  }

  return productRepository.activate(id)
}
