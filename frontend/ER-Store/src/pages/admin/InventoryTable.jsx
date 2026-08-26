import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllInventories, updateMinimumStock, updateStock } from "../../api/adminInventory.api.js";
import ProductTable from "../../components/inventory/ProductTable";

export default function InventoryTable() {
  const [inventories, setInventories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [drafts, setDrafts] = useState({});

  useEffect(() => {
    getAllInventories()
      .then((response) => setInventories(response.data ?? response ?? []))
      .catch((requestError) => setError(requestError.message || "No fue posible cargar los productos"))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdateInventory = async (inventory) => {
    const productId = inventory.product.id;
    const draft = drafts[productId] || {};
    setUpdatingId(productId);
    setError(null);

    try {
      const [stockResponse, minimumStockResponse] = await Promise.all([
        updateStock(productId, draft.stock ?? inventory.stock),
        updateMinimumStock(productId, draft.minimumStock ?? inventory.minimumStock)
      ]);
      const updatedInventory = minimumStockResponse.data ?? stockResponse.data;
      setInventories((currentInventories) => currentInventories.map((item) => (
        item.productId === inventory.productId
          ? { ...item, ...updatedInventory, product: item.product }
          : item
      )));
      setDrafts((currentDrafts) => ({ ...currentDrafts, [productId]: undefined }));
    } catch (requestError) {
      setError(requestError.message || "No fue posible cambiar el estado del producto");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredInventories = inventories.filter((inventory) => {
    const query = search.toLowerCase().trim();
    return !query || [inventory.product?.name, inventory.product?.reference, inventory.product?.category?.name]
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
          <span className="adm-card__meta">{filteredInventories.length} productos</span>
        </div>
        {loading && <p className="adm-card__meta">Cargando productos...</p>}
        {error && <p className="adm-card__meta">{error}</p>}
        {!loading && !error && (
          <ProductTable
            inventories={filteredInventories}
            drafts={drafts}
            onDraftChange={(productId, field, value) => setDrafts((current) => ({
              ...current,
              [productId]: { ...current[productId], [field]: value }
            }))}
            onUpdateInventory={handleUpdateInventory}
            updatingId={updatingId}
          />
        )}
      </section>
    </>
  );
}
