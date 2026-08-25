import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getProducts } from "../../api/products.api.js";
import { deleteProduct } from "../../api/adminProducts.api.js";

export default function DeleteProduct() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(() => searchParams.get("id") ? [searchParams.get("id")] : []);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = () => {
    getProducts()
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

  const handleDelete = async () => {
    try {
      setSubmitting(true);
      setError(null);
      await Promise.all(selected.map((id) => deleteProduct(id)));
      navigate("/admin/inventory");
    } catch (requestError) {
      setError(requestError.message || "No fue posible desactivar los productos");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <h1 className="adm-page-title">Eliminar productos</h1>
      <p className="adm-page-subtitle">
        Marca uno o varios productos y confirma la eliminación.
      </p>

      {error && <p className="adm-muted-banner">{error}</p>}
      <p className="adm-muted-banner">
        Selecciona los productos que deseas retirar del catálogo.
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
          <button type="button" className="adm-btn adm-btn--danger" disabled={!selected.length || submitting} onClick={handleDelete}>
            {submitting ? "Eliminando..." : "Eliminar seleccionados"}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
