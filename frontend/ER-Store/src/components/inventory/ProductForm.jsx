export default function ProductForm({ defaultValues = {}, categories = [], onSubmit, submitLabel = "Guardar producto", submitting = false }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit?.({
      reference: formData.get("reference").trim(),
      name: formData.get("name").trim(),
      description: formData.get("description").trim(),
      price: Number(formData.get("price")),
      brand: formData.get("brand").trim(),
      categoryId: Number(formData.get("categoryId")),
    });
  };

  return (
    <div className="adm-form-card">
      <h2 className="adm-form-card__title">Información general</h2>
      <form onSubmit={handleSubmit}>
        <div className="adm-field">
          <label className="adm-label" htmlFor="admProdName">
            Nombre del producto
          </label>
          <input
            id="admProdReference"
            name="reference"
            type="text"
            className="adm-input"
            placeholder="Referencia / SKU"
            defaultValue={defaultValues.reference ?? ""}
            required
          />
        </div>

        <div className="adm-field">
          <label className="adm-label" htmlFor="admProdName">
            Nombre del producto
          </label>
          <input
            id="admProdName"
            name="name"
            type="text"
            className="adm-input"
            placeholder="Nombre"
            defaultValue={defaultValues.name ?? ""}
            required
          />
        </div>

        <div className="adm-field">
          <label className="adm-label" htmlFor="admProdCategory">
            Categoría
          </label>
          <select
            id="admProdCategory"
            name="categoryId"
            className="adm-select"
            defaultValue={defaultValues.categoryId ?? defaultValues.category?.id ?? ""}
            required
          >
            <option value="">Seleccionar</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="adm-field">
          <label className="adm-label" htmlFor="admProdDesc">
            Descripción
          </label>
          <textarea
            id="admProdDesc"
            name="description"
            className="adm-textarea"
            placeholder="Descripción breve"
            defaultValue={defaultValues.alternative ?? defaultValues.description ?? ""}
            required
          />
        </div>

        <div className="adm-field">
          <label className="adm-label" htmlFor="admProdPrice">
            Precio de venta (COP)
          </label>
          <input
            id="admProdPrice"
            name="price"
            type="number"
            className="adm-input"
            placeholder="Valor"
            min={0}
            step={1000}
            defaultValue={defaultValues.price ?? ""}
            required
          />
        </div>

        <div className="adm-field">
          <label className="adm-label" htmlFor="admProdBrand">Marca</label>
          <input id="admProdBrand" name="brand" type="text" className="adm-input" placeholder="Marca" defaultValue={defaultValues.brand ?? ""} required />
        </div>

        <button type="submit" className="adm-btn adm-btn--primary" disabled={submitting}>
          {submitting ? "Guardando..." : submitLabel}
        </button>
      </form>
    </div>
  );
}
