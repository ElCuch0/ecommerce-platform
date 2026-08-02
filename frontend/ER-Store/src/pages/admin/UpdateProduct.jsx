import { Link } from "react-router-dom";
import { products } from "../../data.jsx";
import ProductForm from "../../components/inventory/ProductForm";
import StockSection from "../../components/inventory/StockSection";

export default function UpdateProduct() {
  const first = products[0];

  return (
    <>
      <h1 className="adm-page-title">Actualizar producto</h1>
      <p className="adm-page-subtitle">Elige un producto y modifica los campos.</p>

      <div className="adm-form-card">
        <h2 className="adm-form-card__title">Seleccionar producto</h2>
        <div className="adm-field">
          <label className="adm-label" htmlFor="admUpdSelect">
            Producto
          </label>
          <select id="admUpdSelect" className="adm-select" defaultValue={first?.id}>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                ER-{String(p.id).padStart(3, "0")} — {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="adm-form-grid">
        <div>
          <ProductForm defaultValues={first} />
          <StockSection defaultStock={first?.stock} />
        </div>
      </div>

      <div className="adm-form-actions">
        <button type="button" className="adm-btn adm-btn--primary">
          Guardar cambios
        </button>
        <Link to="/admin/inventory" className="adm-btn adm-btn--outline">
          Volver a la tabla
        </Link>
      </div>
    </>
  );
}
