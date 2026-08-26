import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminProducts } from "../../api/products.api.js";
import { toggleProductStatus } from "../../api/adminProducts.api.js";
import ProductTable from "../../components/inventory/ProductTable";

export default function InventoryTable() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    getAdminProducts()
      .then((response) => setProducts(response.data ?? response ?? []))
      .catch((requestError) => setError(requestError.message || "No fue posible cargar los productos"))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleStatus = async (product) => {
    setUpdatingId(product.id);
    setError(null);

    try {
      const response = await toggleProductStatus(product.id, product.isActive);
      setProducts((currentProducts) => currentProducts.map((item) => (
        item.id === product.id
          ? { ...item, isActive: response.data?.isActive ?? !product.isActive }
          : item
      )));
    } catch (requestError) {
      setError(requestError.message || "No fue posible cambiar el estado del producto");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase().trim();
    return !query || [product.name, product.reference, product.category?.name]
      .some((value) => String(value || "").toLowerCase().includes(query));
  });

  return (
    <>
      <h1 className="adm-page-title">Tabla de inventario</h1>
      <p className="adm-page-subtitle">
        Consulta y filtra los productos del inventario, incluidos los inactivos.
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
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="adm-toolbar__actions">
          <Link to="/admin/add-product" className="adm-btn adm-btn--primary">
            Agregar producto
          </Link>
        </div>
      </div>

      <section className="adm-card">
        <div className="adm-card__head">
          <h2 className="adm-card__title">Productos</h2>
          <span className="adm-card__meta">{filteredProducts.length} productos</span>
        </div>
        {loading && <p className="adm-card__meta">Cargando productos...</p>}
        {error && <p className="adm-card__meta">{error}</p>}
        {!loading && !error && (
          <ProductTable
            products={filteredProducts}
            onToggleStatus={handleToggleStatus}
            updatingId={updatingId}
          />
        )}
      </section>
    </>
  );
}
