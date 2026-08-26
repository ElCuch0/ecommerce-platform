import { useEffect, useState } from "react";
import { getAllOrders } from "../../api/adminOrders.api.js";
import { getAdminProducts } from "../../api/products.api.js";
import { getAllInventories } from "../../api/adminInventory.api.js";

function getResponseData(response) {
  const data = response?.data ?? response;
  return Array.isArray(data) ? data : [];
}

function formatCurrency(value) {
  return `$${Number(value || 0).toLocaleString("es-CO")}`;
}

function isToday(value) {
  const date = new Date(value);
  const today = new Date();
  return date.getFullYear() === today.getFullYear()
    && date.getMonth() === today.getMonth()
    && date.getDate() === today.getDate();
}

export default function DashboardHome() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getAllOrders(), getAdminProducts(), getAllInventories()])
      .then(([ordersResponse, productsResponse, inventoryResponse]) => {
        setOrders(getResponseData(ordersResponse));
        setProducts(getResponseData(productsResponse));
        setInventories(getResponseData(inventoryResponse));
      })
      .catch((requestError) => setError(requestError.message || "No fue posible cargar el dashboard"))
      .finally(() => setLoading(false));
  }, []);

  const salesToday = orders
    .filter((order) => order.status !== "CANCELLED" && isToday(order.createdAt))
    .reduce((total, order) => total + Number(order.total || 0), 0);
  const pendingOrders = orders.filter((order) => order.status !== "DELIVERED").length;
  const activeProducts = products.filter((product) => product.isActive).length;
  const recentOrders = orders.slice(0, 10);
  const lowStock = inventories.filter((inventory) => (
    inventory.product?.isActive !== false
    && Number(inventory.stock || 0) <= Number(inventory.minimumStock || 0)
  ));

  if (loading) {
    return <p className="adm-card__meta">Cargando dashboard...</p>;
  }

  return (
    <>
      <h1 className="adm-page-title">Dashboard</h1>
      <p className="adm-page-subtitle">
        Resumen operativo de la tienda en tiempo real.
      </p>

      {error && <p className="adm-muted-banner">{error}</p>}

      <section className="adm-kpi-grid" aria-label="Indicadores">
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Ventas (hoy)</span>
          <span className="adm-stat__value">{formatCurrency(salesToday)}</span>
          <span className="adm-stat__hint">Órdenes creadas hoy, sin canceladas</span>
        </article>
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Pedidos pendientes</span>
          <span className="adm-stat__value">{pendingOrders}</span>
          <span className="adm-stat__hint">Órdenes con estado distinto de entregado</span>
        </article>
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Productos activos</span>
          <span className="adm-stat__value">{activeProducts}</span>
          <span className="adm-stat__hint">Disponibles en el catálogo</span>
        </article>
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Visitas (7 días)</span>
          <span className="adm-stat__value">—</span>
          <span className="adm-stat__hint">Sin endpoint de analítica disponible</span>
        </article>
      </section>

      <div className="adm-panels">
        <section className="adm-card" aria-labelledby="admRecentOrders">
          <div className="adm-card__head">
            <h2 className="adm-card__title" id="admRecentOrders">
              Últimos pedidos
            </h2>
          </div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 && (
                  <tr><td colSpan={4}>No hay pedidos para mostrar.</td></tr>
                )}
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.user?.name} {order.user?.lastname}</td>
                    <td>
                      <span className="adm-badge adm-badge--muted">{order.status || "PENDING"}</span>
                    </td>
                    <td>{formatCurrency(order.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="adm-card" aria-labelledby="admStockLow">
          <div className="adm-card__head">
            <h2 className="adm-card__title" id="admStockLow">
              Stock bajo
            </h2>
          </div>
          {lowStock.length === 0 && <p className="adm-card__meta">No hay alertas de stock bajo.</p>}
          {lowStock.length > 0 && (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr><th>Producto</th><th>Stock</th><th>Mínimo</th></tr>
                </thead>
                <tbody>
                  {lowStock.map((inventory) => (
                    <tr key={inventory.id}>
                      <td>{inventory.product?.name || `Producto #${inventory.productId}`}</td>
                      <td><span className="adm-badge adm-badge--warn">{inventory.stock}</span></td>
                      <td>{inventory.minimumStock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
