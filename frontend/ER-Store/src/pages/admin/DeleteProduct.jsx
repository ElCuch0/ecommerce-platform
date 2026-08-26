import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminProducts } from "../../api/products.api.js";
import { toggleProductStatus } from "../../api/adminProducts.api.js";

export default function DeleteProduct() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState(null);

  const loadProducts = () => {
    getAdminProducts()
      .then((response) => setProducts(response.data ?? response ?? []))
      .catch((requestError) => setError(requestError.message || "No fue posible cargar los productos"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadProducts(); }, []);

  const visibleProducts = products.filter((product) => {
    const query = search.toLowerCase().trim();
    return !query || product.name.toLowerCase().includes(query) || product.reference?.toLowerCase().includes(query);
  });

  const toggleSelected = (id) => {
    setSelected((current) => current.includes(String(id)) ? current.filter((item) => item !== String(id)) : [...current, String(id)]);
  };

  const selectVisible = () => {
    setSelected((current) => [...new Set([...current, ...visibleProducts.map((product) => String(product.id))])]);
  };

  const handleStatusChange = async (isActive) => {
    const selectedProducts = products.filter((product) => (
      selected.includes(String(product.id)) && product.isActive === isActive
    ));

    if (!selectedProducts.length) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await Promise.all(selectedProducts.map((product) => toggleProductStatus(product.id, isActive)));
      setProducts((current) => current.map((product) => selectedProducts.some((selectedProduct) => selectedProduct.id === product.id)
        ? { ...product, isActive: !isActive }
        : product));
      setSelected([]);
    } catch (requestError) {
      setError(requestError.message || "No fue posible cambiar el estado de los productos");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSingleStatusChange = async (product) => {
    setUpdatingId(product.id);
    setError(null);
    try {
      const response = await toggleProductStatus(product.id, product.isActive);
      setProducts((current) => current.map((item) => item.id === product.id ? response.data : item));
    } catch (requestError) {
      setError(requestError.message || "No fue posible cambiar el estado del producto");
    } finally {
      setUpdatingId(null);
    }
  };
  return (
    <>
      <h1 className="adm-page-title">Estado de productos</h1>
      <p className="adm-page-subtitle">
        Activa o desactiva los productos disponibles en el catálogo.
      </p>

      {error && <p className="adm-muted-banner">{error}</p>}
      <p className="adm-muted-banner">
        Los productos inactivos no aparecen en la tienda, pero permanecen disponibles para reactivarlos.
        </p>

      <div className="adm-toolbar">
        <div className="adm-toolbar__grow">
          <label className="adm-label" htmlFor="admDelSearch">
            Buscar
          </label>
            <input id="admDelSearch" type="search" className="adm-input" placeholder="Filtrar por nombre…" value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
        <div className="adm-toolbar__actions">
          <button type="button" className="adm-btn adm-btn--outline adm-btn--sm" onClick={selectVisible}>
            Seleccionar visibles
          </button>
          <button type="button" className="adm-btn adm-btn--danger" disabled={!selected.length || submitting} onClick={() => handleStatusChange(true)}>
            {submitting ? "Actualizando..." : "Desactivar seleccionados"}
          </button>
          <button type="button" className="adm-btn adm-btn--primary" disabled={!selected.length || submitting} onClick={() => handleStatusChange(false)}>
            {submitting ? "Actualizando..." : "Activar seleccionados"}
          </button>
          <Link to="/admin/inventory" className="adm-btn adm-btn--outline">
            Volver a la tabla
          </Link>
        </div>
      </div>

      <section className="adm-card">
        <div className="adm-card__head">
          <h2 className="adm-card__title">Productos</h2>
          <span className="adm-card__meta">{selected.length} seleccionados</span>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th scope="col" style={{ width: "2.5rem" }}>
                  <input type="checkbox" aria-label="Seleccionar todos" checked={visibleProducts.length > 0 && visibleProducts.every((product) => selected.includes(String(product.id)))} onChange={selectVisible} />
                </th>
                <th>SKU</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {!loading && visibleProducts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <input type="checkbox" aria-label={`Seleccionar ${p.name}`} checked={selected.includes(String(p.id))} onChange={() => toggleSelected(p.id)} />
                  </td>
                  <td>{p.reference || `ER-${String(p.id).padStart(3, "0")}`}</td>
                  <td>{p.name}</td>
                  <td>{p.category?.name || p.category || "Sin categoría"}</td>
                  <td>{p.inventory?.stock ?? p.stock ?? 0}</td>
                  <td>
                    <span className={`adm-badge ${p.isActive ? "adm-badge--ok" : "adm-badge--warn"}`}>
                      {p.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="adm-table__actions">
                    <button type="button" disabled={updatingId === p.id} onClick={() => handleSingleStatusChange(p)}>
                      {updatingId === p.id ? "Actualizando..." : p.isActive ? "Desactivar" : "Activar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
