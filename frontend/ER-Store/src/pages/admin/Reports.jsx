import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../api/adminOrders.api.js";
import { getAllInventories, getInventoryMovements } from "../../api/adminInventory.api.js";

const periodDays = 7;

function getResponseData(response) {
  const data = response?.data ?? response;
  return Array.isArray(data) ? data : [];
}

function formatCurrency(value) {
  return `$${Number(value || 0).toLocaleString("es-CO")}`;
}

function formatDay(value) {
  return new Date(value).toLocaleDateString("es-CO", { weekday: "short", day: "numeric" });
}

function isInPeriod(value, startDate) {
  return new Date(value) >= startDate;
}

export default function Reports() {
  const [orders, setOrders] = useState([]);
  const [movements, setMovements] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getAllOrders(), getInventoryMovements(), getAllInventories()])
      .then(([ordersResponse, movementsResponse, inventoriesResponse]) => {
        setOrders(getResponseData(ordersResponse));
        setMovements(getResponseData(movementsResponse));
        setInventories(getResponseData(inventoriesResponse));
      })
      .catch((requestError) => setError(requestError.message || "No fue posible cargar los informes"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="adm-card__meta">Cargando informes...</p>;
  }

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - (periodDays - 1));
  startDate.setHours(0, 0, 0, 0);

  const weeklyOrders = orders.filter((order) => (
    order.status !== "CANCELLED" && isInPeriod(order.createdAt, startDate)
  ));
  const weeklyRevenue = weeklyOrders.reduce((total, order) => total + Number(order.total || 0), 0);
  const weeklyUnits = weeklyOrders.reduce((total, order) => (
    total + (order.items || []).reduce((itemsTotal, item) => itemsTotal + Number(item.quantity || 0), 0)
  ), 0);
  const weeklyMovements = movements.filter((movement) => isInPeriod(movement.createdAt, startDate));
  const exitMovements = weeklyMovements.filter((movement) => movement.type === "EXIT");
  const totalExitedUnits = exitMovements.reduce((total, movement) => total + Number(movement.quantity || 0), 0);
  const totalStock = inventories.reduce((total, inventory) => total + Number(inventory.stock || 0), 0);
  const rotation = totalStock > 0 ? totalExitedUnits / totalStock : 0;
  const lowStock = inventories.filter((inventory) => (
    inventory.product?.isActive !== false
    && Number(inventory.stock || 0) <= Number(inventory.minimumStock || 0)
  ));

  const dailySales = Array.from({ length: periodDays }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    const total = weeklyOrders
      .filter((order) => new Date(order.createdAt) >= date && new Date(order.createdAt) < nextDate)
      .reduce((sum, order) => sum + Number(order.total || 0), 0);
    return { date, total };
  });

  const productTrends = weeklyMovements.reduce((trend, movement) => {
    const product = movement.inventory?.product;
    if (!product) return trend;
    const current = trend[product.id] || { name: product.name, reference: product.reference, count: 0 };
    current.count += 1;
    trend[product.id] = current;
    return trend;
  }, {});
  const trendingProducts = Object.values(productTrends).sort((first, second) => second.count - first.count).slice(0, 5);

  return (
    <>
      <h1 className="adm-page-title">Informes</h1>
      <p className="adm-page-subtitle">
        Métricas operativas calculadas sobre los últimos 7 días.
      </p>

      {error && <p className="adm-muted-banner">{error}</p>}

      <section className="adm-kpi-grid" aria-label="Indicadores de informes">
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Ventas semanales</span>
          <span className="adm-stat__value">{formatCurrency(weeklyRevenue)}</span>
          <span className="adm-stat__hint">{weeklyOrders.length} órdenes no canceladas</span>
        </article>
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Tendencias de productos</span>
          <span className="adm-stat__value">{exitMovements.length}</span>
          <span className="adm-stat__hint">Movimientos de salida registrados</span>
        </article>
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Ingresos</span>
          <span className="adm-stat__value">{formatCurrency(weeklyRevenue)}</span>
          <span className="adm-stat__hint">Período actual de 7 días</span>
        </article>
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Rotación inventario</span>
          <span className="adm-stat__value">{rotation.toFixed(2)}x</span>
          <span className="adm-stat__hint">Estimación: salidas / stock actual</span>
        </article>
      </section>

      <div className="adm-panels">
        <section className="adm-card" aria-labelledby="weeklySales">
          <div className="adm-card__head">
            <h2 className="adm-card__title" id="weeklySales">Ventas semanales</h2>
            <span className="adm-card__meta">{weeklyUnits} unidades</span>
          </div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Día</th><th>Ingresos</th></tr></thead>
              <tbody>
                {dailySales.map((day) => (
                  <tr key={day.date.toISOString()}><td>{formatDay(day.date)}</td><td>{formatCurrency(day.total)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="adm-card" aria-labelledby="productTrends">
          <div className="adm-card__head">
            <h2 className="adm-card__title" id="productTrends">Tendencias en productos</h2>
            <span className="adm-card__meta">Por movimientos de inventario</span>
          </div>
          {!trendingProducts.length && <p className="adm-card__meta">No hay movimientos de salida en el período.</p>}
          {trendingProducts.length > 0 && (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead><tr><th>Producto</th><th>Movimientos</th></tr></thead>
                <tbody>
                  {trendingProducts.map((product) => (
                    <tr key={product.reference || product.name}><td>{product.name}</td><td>{product.count}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <section className="adm-card" aria-labelledby="admReportsIntro">
        <div className="adm-card__head">
          <h2 className="adm-card__title" id="admReportsIntro">
            Resumen rápido
          </h2>
        </div>
        <div className="adm-kpi-grid">
          <article className="adm-card adm-card--stat"><span className="adm-stat__label">Ticket promedio</span><span className="adm-stat__value">{formatCurrency(weeklyOrders.length ? weeklyRevenue / weeklyOrders.length : 0)}</span></article>
          <article className="adm-card adm-card--stat"><span className="adm-stat__label">Stock actual</span><span className="adm-stat__value">{totalStock}</span><span className="adm-stat__hint">Unidades disponibles</span></article>
          <article className="adm-card adm-card--stat"><span className="adm-stat__label">Alertas de stock</span><span className="adm-stat__value">{lowStock.length}</span><span className="adm-stat__hint">Productos bajo el mínimo</span></article>
          <article className="adm-card adm-card--stat"><span className="adm-stat__label">Movimientos</span><span className="adm-stat__value">{weeklyMovements.length}</span><span className="adm-stat__hint">Entradas, salidas y ajustes</span></article>
        </div>
        {lowStock.length > 0 && (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Alerta</th><th>Stock</th><th>Mínimo</th></tr></thead>
              <tbody>
                {lowStock.slice(0, 5).map((inventory) => (
                  <tr key={inventory.id}><td>{inventory.product?.name || `Producto #${inventory.productId}`}</td><td><span className="adm-badge adm-badge--warn">{inventory.stock}</span></td><td>{inventory.minimumStock}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Link to="/admin" className="adm-btn adm-btn--outline">
          Volver al dashboard
        </Link>
      </section>
    </>
  );
}
