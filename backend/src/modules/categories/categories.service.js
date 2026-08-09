import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import { ConflictError } from "../../shared/errors/Conflicterror.js";
import * as repository from "./categories.repository.js";

export async function findAll() {
  
  try {
    return await findAll();
  }catch (error) {
    throw new NotFoundError("Categorías no encontradas");
  }
}

export async function findById(id) {

  try {
    return await findById(id);
  }catch (error) {
    throw new NotFoundError("Categoría no encontrada");
  }
}

export async function create(data) {

  const category = await repository.findByName(data.name)

  if (category) {
    throw new ConflictError("La categoría ya existe")
  }

  return repository.create(data)
}

export async function remove(id) {

  const category = await repository.findById(id)

  if (!category) {
    throw new NotFoundError("No se ha encontrado la categoría")
  }

  return await repository.remove(id)
}
