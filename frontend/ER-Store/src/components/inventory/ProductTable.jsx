import { Link } from "react-router-dom";

const formatCOP = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

export default function ProductTable({ products = [] }) {
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
            <th>SKU</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
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
              <td>{product.inventory?.stock ?? product.stock ?? 0}</td>
              <td>
                {(product.inventory?.stock ?? product.stock ?? 0) > 0 ? (
                  <span className="adm-badge adm-badge--ok">En stock</span>
                ) : (
                  <span className="adm-badge adm-badge--warn">Agotado</span>
                )}
              </td>
              <td className="adm-table__actions">
                <Link to={`/admin/update-product?id=${product.id}`}>Editar</Link>
                <Link to={`/admin/delete-product?id=${product.id}`}>Eliminar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
