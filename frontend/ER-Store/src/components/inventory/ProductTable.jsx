const formatCOP = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

export default function ProductTable({ inventories = [], drafts = {}, onDraftChange, onUpdateInventory, updatingId }) {
  const products = inventories.map((inventory) => ({
    ...inventory.product,
    inventory,
    inventoryRecord: inventory
  }));

  if (products.length === 0) {
    return (
      <p className="adm-card__meta">No hay productos para mostrar.</p>
    );
  }

  return (
    <div className="adm-table-wrap">
      <table className="adm-table">
        <thead>
          <tr>
            <th>Referencia</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Stock mínimo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.reference || `ER-${String(product.id).padStart(3, "0")}`}</td>
              <td>{product.name}</td>
              <td>{product.category?.name || product.category || "Sin categoría"}</td>
              <td>{formatCOP(product.price)}</td>
              <td>
                <input
                  type="number"
                  className="adm-input"
                  min="0"
                  value={drafts[product.id]?.stock ?? product.inventory?.stock ?? product.stock ?? 0}
                  onChange={(event) => onDraftChange(product.id, "stock", event.target.value)}
                  aria-label={`Stock de ${product.name}`}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="adm-input"
                  min="0"
                  value={drafts[product.id]?.minimumStock ?? product.inventory?.minimumStock ?? 0}
                  onChange={(event) => onDraftChange(product.id, "minimumStock", event.target.value)}
                  aria-label={`Stock mínimo de ${product.name}`}
                />
              </td>
              <td>
                {product.isActive ? (
                  <span className="adm-badge adm-badge--ok">Activo</span>
                ) : (
                  <span className="adm-badge adm-badge--warn">Inactivo</span>
                )}
              </td>
              <td className="adm-table__actions">
                <button
                  type="button"
                  onClick={() => onUpdateInventory(product.inventoryRecord)}
                  disabled={updatingId === product.id}
                >
                  {updatingId === product.id
                    ? "Actualizando..."
                    : "Guardar stock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
