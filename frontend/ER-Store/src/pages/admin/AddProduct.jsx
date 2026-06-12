import { Link } from "react-router-dom";
import ProductForm from "../../components/inventory/ProductForm";
import ProductImages from "../../components/inventory/ProductImages";
import StockSection from "../../components/inventory/StockSection";

export default function AddProduct() {
  return (
    <>
      <h1 className="adm-page-title">Agregar nuevo producto</h1>
      <p className="adm-page-subtitle">Completa la información del producto.</p>

      <p className="adm-muted-banner">
        Las imágenes se listan en el navegador; conecta el backend para subir archivos reales.
      </p>

      <div className="adm-form-grid">
        <div>
          <ProductForm />
          <StockSection />
        </div>
        <div>
          <ProductImages />
        </div>
      </div>

      <div className="adm-form-actions">
        <button type="button" className="adm-btn adm-btn--primary">
          Guardar producto
        </button>
        <Link to="/admin/inventory" className="adm-btn adm-btn--outline">
          Cancelar
        </Link>
      </div>
    </>
  );
}
