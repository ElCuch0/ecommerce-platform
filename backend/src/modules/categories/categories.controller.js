export async function findAllCategories(req, res, next) {
  try {
    return res.status(200).json({
      message: "Categorías encontradas con éxito",
      data: await findAllCategories()
    });
  } catch (error) {
    next(error);
  }
}

export async function findCategoryById(req, res, next) {
  try {
    const { id } = req.params;
    const category = await findCategoryById(id);
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

export async function createCategory(req, res, next) {
  try {
    const { name, description } = req.body;
    const category = await createCategory({ name, description });
    return res.status(201).json({
      message: "Categoría creada con éxito",
      data: category
    });
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    const category = await updateCategory(categoryId, { name, description });
    return res.status(200).json({
      message: "Categoría actualizada con éxito",
      data: category
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { categoryId } = req.params;
    const category = await deleteCategory(categoryId);
    return res.status(200).json({
      message: "Categoría eliminada con éxito",
      data: category
    });
  } catch (error) {
    next(error);
  }
}
