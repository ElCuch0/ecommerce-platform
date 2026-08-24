import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import { ConflictError } from "../../shared/errors/Conflicterror.js";
import * as repository from "./categories.repository.js";

export async function findAll() {
  return repository.findAll()
}

export async function findById(id) {

  const category = await repository.findById(id)

  if (!category) {
    throw new NotFoundError("Categoria no encontrada")
  }

  return category
}

export async function create(data) {

  const category = await repository.findByName(data.name)

  if (category) {
    throw new ConflictError("La categoría ya existe")
  }

  return repository.create(data)
}

export async function update(id, data) {

  const category = await repository.findById(id)

  if (!category) {
    throw new NotFoundError("Categoria no encontrada")
  }

  const categories = await repository.findAll()

  for (const newCategory of categories) {

    if (newCategory.name === data.name) {
      throw new ConflictError("La categoría ya existe")
    }
  }

  return repository.update(id, data)
}

export async function deactivate(id) {

  const category = await repository.findById(id)

  if (!category) {
    throw new NotFoundError("No se ha encontrado la categoría")
  }

  if (!category.isActive) {
    throw new ConflictError("La categoría ya está inactiva")
  }

  return await repository.deactivate(id)
}

export async function activate(id) {

  const category = await repository.findById(id)

  if (!category) {
    throw new NotFoundError("No se ha encontrado la categoría")
  }

  if (category.isActive) {
    throw new ConflictError("La categoría ya está activa")
  }

  return await repository.activate(id)
}
