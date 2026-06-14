import { Link } from "react-router-dom";
import { products } from "../../data.jsx";

export default function DeleteProduct() {
  return (
    <>
      <h1 className="adm-page-title">Eliminar productos</h1>
      <p className="adm-page-subtitle">
        Marca uno o varios productos y confirma la eliminación.
      </p>

      <p className="adm-muted-banner">
        Esta vista es de demostración. Conecta el backend para eliminar registros reales.
      </p>

      <div className="adm-toolbar">
        <div className="adm-toolbar__grow">
          <label className="adm-label" htmlFor="admDelSearch">
            Buscar
          </label>
          <input id="admDelSearch" type="search" className="adm-input" placeholder="Filtrar por nombre…" />
        </div>
        <div className="adm-toolbar__actions">
          <button type="button" className="adm-btn adm-btn--outline adm-btn--sm">
            Seleccionar visibles
          </button>
          <button type="button" className="adm-btn adm-btn--danger" disabled>
            Eliminar seleccionados
          </button>
          <Link to="/admin/inventory" className="adm-btn adm-btn--outline">
            Volver a la tabla
          </Link>
        </div>
      </div>

      <section className="adm-card">
        <div className="adm-card__head">
          <h2 className="adm-card__title">Productos</h2>
          <span className="adm-card__meta">0 seleccionados</span>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th scope="col" style={{ width: "2.5rem" }}>
                  <input type="checkbox" aria-label="Seleccionar todos" />
                </th>
                <th>SKU</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <input type="checkbox" aria-label={`Seleccionar ${p.name}`} />
                  </td>
                  <td>ER-{String(p.id).padStart(3, "0")}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
