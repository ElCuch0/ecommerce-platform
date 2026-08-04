export async function findAll(req, res, next) {

  try {
    return res.status(200).json({
      message: "Productos encontrados con éxito",
      data: await findAllProducts()
    });
  }catch (error) {
      next(error);
  }
}

export async function findById(req, res, next) {

  try {
    const { productId } = req.params;

    return res.status(200).json({
      message: "Producto encontrado con éxito",
      data: await findProductById(productId)
    });
  }catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {

  try {
    const { productId, categoryId, name, description, price, color, size, type, status } = req.body;

    return res.status(201).json({
      message: "Producto creado con éxito",
      data: await createProduct({ productId, categoryId, name, description, price, color, size, type, status })
    });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {

  try {
    const { productId } = req.params;
    const { categoryId, name, description, price, color, size, type, status } = req.body;

    return res.status(200).json({
      message: "Producto actualizado con éxito",
      data: await updateProduct(productId, { categoryId, name, description, price, color, size, type, status })
    });
  }catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {

  try {
    const { productId } = req.params;

    return res.status(200).json({
      message: "Producto eliminado con éxito",
      data: await deleteProduct(productId)
    });
  }catch (error) {
    next(error);
  }
}
