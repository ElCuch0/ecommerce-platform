const CATEGORIES = [
  { value: "", label: "Seleccionar" },
  { value: "camisas", label: "Camisas" },
  { value: "pantalones", label: "Pantalones" },
  { value: "vestidos", label: "Vestidos" },
  { value: "zapatos", label: "Zapatos" },
  { value: "accesorios", label: "Accesorios" },
];

export default function ProductForm({ defaultValues = {} }) {
  return (
    <div className="adm-form-card">
      <h2 className="adm-form-card__title">Información general</h2>
      <form>
        <div className="adm-field">
          <label className="adm-label" htmlFor="admProdName">
            Nombre del producto
          </label>
          <input
            id="admProdName"
            type="text"
            className="adm-input"
            placeholder="Nombre"
            defaultValue={defaultValues.name ?? ""}
          />
        </div>

        <div className="adm-field">
          <label className="adm-label" htmlFor="admProdCategory">
            Categoría
          </label>
          <select
            id="admProdCategory"
            className="adm-select"
            defaultValue={defaultValues.category ?? ""}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value || "empty"} value={c.value}>
                {c.label}
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
            className="adm-textarea"
            placeholder="Descripción breve"
            defaultValue={defaultValues.alternative ?? defaultValues.description ?? ""}
          />
        </div>

        <div className="adm-field">
          <label className="adm-label" htmlFor="admProdPrice">
            Precio de venta (COP)
          </label>
          <input
            id="admProdPrice"
            type="number"
            className="adm-input"
            placeholder="Valor"
            min={0}
            step={1000}
            defaultValue={defaultValues.price ?? ""}
          />
        </div>
      </form>
    </div>
  );
}
