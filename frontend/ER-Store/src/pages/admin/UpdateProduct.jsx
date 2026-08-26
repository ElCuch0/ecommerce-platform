import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getProducts } from "../../api/products.api.js";
import { getCategories } from "../../api/categories.api.js";
import { updateProduct } from "../../api/adminProducts.api.js";
import ProductForm from "../../components/inventory/ProductForm.jsx";

export default function UpdateProduct() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(searchParams.get("id") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([productsResponse, categoriesResponse]) => {
        const loadedProducts = productsResponse.data ?? productsResponse ?? [];
        setProducts(loadedProducts);
        setCategories(categoriesResponse.data ?? categoriesResponse ?? []);
        if (!searchParams.get("id") && loadedProducts[0]) setSelectedId(String(loadedProducts[0].id));
      })
      .catch((requestError) => setError(requestError.message || "No fue posible cargar los datos"))
      .finally(() => setLoading(false));
  }, [searchParams]);

  const selectedProduct = products.find((product) => String(product.id) === String(selectedId));

  const handleUpdate = async (productData) => {
    try {
      setSubmitting(true);
      setError(null);
      await updateProduct(selectedId, productData);
      navigate("/admin/inventory");
    } catch (requestError) {
      setError(requestError.message || "No fue posible actualizar el producto");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="adm-page-title">Actualizar producto</h1>
      <p className="adm-page-subtitle">Elige un producto y modifica los campos.</p>

      {error && <p className="adm-muted-banner">{error}</p>}
      <div className="adm-form-card">
        <h2 className="adm-form-card__title">Seleccionar producto</h2>
        <div className="adm-field">
          <label className="adm-label" htmlFor="admUpdSelect">
            Producto
          </label>
          <select id="admUpdSelect" className="adm-select" value={selectedId} onChange={(event) => setSelectedId(event.target.value)} disabled={loading}>
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
          {selectedProduct && <ProductForm key={selectedProduct.id} defaultValues={selectedProduct} categories={categories} onSubmit={handleUpdate} submitLabel="Guardar cambios" submitting={submitting} />}
        </div>
      </div>

      <div className="adm-form-actions">
        <Link to="/admin/inventory" className="adm-btn adm-btn--outline">
          Volver a la tabla
        </Link>
      </div>
    </>
  );
}
