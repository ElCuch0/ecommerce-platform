import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "../../api/adminProducts.api.js";
import { getCategories } from "../../api/categories.api.js";
import ProductForm from "../../components/inventory/ProductForm.jsx";
import ProductImages from "../../components/inventory/ProductImages.jsx";

export default function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCategories()
      .then((response) => setCategories(response.data ?? response ?? []))
      .catch((requestError) => setError(requestError.message || "No fue posible cargar las categorías"));
  }, []);

  const handleCreate = async (productData) => {
    try {
      setSubmitting(true);
      setError(null);
      await createProduct(productData);
      navigate("/admin/inventory");
    } catch (requestError) {
      setError(requestError.message || "No fue posible crear el producto");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="adm-page-title">Agregar nuevo producto</h1>
      <p className="adm-page-subtitle">Completa la información del producto.</p>

      {error && <p className="adm-muted-banner">{error}</p>}

      <div className="adm-form-grid">
        <div>
          <ProductForm categories={categories} onSubmit={handleCreate} submitting={submitting} />
          <StockSection />
        </div>
        <div>
          <ProductImages />
        </div>
      </div>

      <div className="adm-form-actions">
        <Link to="/admin/inventory" className="adm-btn adm-btn--outline">
          Cancelar
        </Link>
      </div>
    </>
  );
}
