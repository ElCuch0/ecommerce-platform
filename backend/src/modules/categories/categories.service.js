import { NotFoundError, ConflictError } from "../../utils/errors.js";
import { createCategory, findAllCategories, findCategoryById, updateCategory, deleteCategory } from "./categories.repository.js";

export async function findAllCategories() {
  
  try {
    return await findAllCategories();
  }catch (error) {
    throw new NotFoundError("Categorías no encontradas");
  }
}

export async function findCategoryById(categoryId) {

  try {
    return await findCategoryById(categoryId);
  }catch (error) {
    throw new NotFoundError("Categoría no encontrada");
  }
}

export async function createCategory(data) {

  try { 

    data.categoryId = Number(data.categoryId);
    data.name = data.name.trim().toLowerCase();
    data.description = data.description.trim();

    return await createCategory(data);
  }catch (error) {
    throw new ConflictError("Error al crear la categoría: " + error.message);
  }
}

export async function updateCategory(categoryId, data) {

  const existingCategory = await findCategoryById(categoryId);

  if (!existingCategory) {
    throw new NotFoundError("Categoría no encontrada");
  }

  try {
    data.name = data.name.trim().toLowerCase();
    data.description = data.description.trim();

    return await updateCategory(categoryId, data);
  }catch (error) {
    throw new ConflictError("Error al actualizar la categoría: " + error.message);
  }

}

export async function deleteCategory(categoryId) {

  const existingCategory = await findCategoryById(categoryId);

  if (!existingCategory) {
    throw new NotFoundError("Categoría no encontrada");
  }

  try {
    return await deleteCategory(categoryId);
  }catch (error) {
    throw new ConflictError("Error al eliminar la categoría: " + error.message);
  }
}
