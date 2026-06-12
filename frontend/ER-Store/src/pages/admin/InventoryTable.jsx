import { Link } from "react-router-dom";
import { products } from "../../data.jsx";
import ProductTable from "../../components/inventory/ProductTable";

export default function InventoryTable() {
  return (
    <>
      <h1 className="adm-page-title">Tabla de inventario</h1>
      <p className="adm-page-subtitle">
        Consulta, filtra y accede a actualizar o eliminar productos.
      </p>

      <div className="adm-toolbar">
        <div className="adm-toolbar__grow">
          <label className="adm-label" htmlFor="admInvSearch">
            Buscar
          </label>
          <input
            id="admInvSearch"
            type="search"
            className="adm-input"
            placeholder="Nombre, SKU o categoría…"
          />
        </div>
        <div className="adm-toolbar__actions">
          <Link to="/admin/add-product" className="adm-btn adm-btn--primary">
            Agregar producto
          </Link>
          <Link to="/admin/delete-product" className="adm-btn adm-btn--outline">
            Eliminar…
          </Link>
        </div>
      </div>

      <section className="adm-card">
        <div className="adm-card__head">
          <h2 className="adm-card__title">Productos</h2>
          <span className="adm-card__meta">{products.length} productos</span>
        </div>
        <ProductTable products={products} />
      </section>
    </>
  );
}
