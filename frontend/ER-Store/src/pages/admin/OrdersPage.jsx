import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../api/adminOrders.api.js";

const statuses = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

const statusLabels = {
  PENDING: "Pendiente",
  PAID: "Pagada",
  SHIPPED: "Enviada",
  DELIVERED: "Entregada",
  CANCELLED: "Cancelada"
};

function formatCurrency(value) {
  return `$${Number(value || 0).toLocaleString("es-CO")}`;
}

function formatDate(value) {
  if (!value) return "Sin fecha";
  return new Date(value).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function getResponseData(response) {
  const data = response?.data ?? response;
  return Array.isArray(data) ? data : [];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllOrders()
      .then((response) => setOrders(getResponseData(response)))
      .catch((requestError) => setError(requestError.message || "No fue posible cargar las órdenes"))
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = orders.filter((order) => {
    const query = search.toLowerCase().trim();
    const customer = `${order.user?.name || ""} ${order.user?.lastname || ""} ${order.user?.email || ""}`;
    const matchesSearch = !query || customer.toLowerCase().includes(query) || String(order.id).includes(query);
    return matchesSearch && (filter === "ALL" || order.status === filter);
  });

  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId);
    setError(null);

    try {
      const response = await updateOrderStatus(orderId, status);
      const updatedOrder = response?.data ?? response;
      setOrders((currentOrders) => currentOrders.map((order) => (
        order.id === orderId
          ? { ...order, status: updatedOrder.status || status }
          : order
      )));
    } catch (requestError) {
      setError(requestError.message || "No fue posible actualizar el estado de la orden");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <h1 className="adm-page-title">Órdenes</h1>
      <p className="adm-page-subtitle">Consulta las órdenes y actualiza su estado de despacho.</p>

      {error && <p className="adm-muted-banner">{error}</p>}

      <div className="adm-toolbar">
        <div className="adm-toolbar__grow">
          <label className="adm-label" htmlFor="orderSearch">Buscar orden o cliente</label>
          <input
            id="orderSearch"
            type="search"
            className="adm-input"
            placeholder="Número, nombre o correo"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="adm-toolbar__grow">
          <label className="adm-label" htmlFor="orderStatusFilter">Filtrar por estado</label>
          <select id="orderStatusFilter" className="adm-select" value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value="ALL">Todos los estados</option>
            {statuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}
          </select>
        </div>
      </div>

      <section className="adm-card">
        <div className="adm-card__head">
          <h2 className="adm-card__title">Listado de órdenes</h2>
          <span className="adm-card__meta">{filteredOrders.length} órdenes</span>
        </div>
        {loading && <p className="adm-card__meta">Cargando órdenes...</p>}
        {!loading && !filteredOrders.length && <p className="adm-card__meta">No hay órdenes para mostrar.</p>}
        {!loading && filteredOrders.length > 0 && (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Cliente</th>
                  <th>Productos</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>
                      <strong>{order.user?.name} {order.user?.lastname}</strong>
                      <br />
                      <span className="adm-card__meta">{order.user?.email || "Sin correo"}</span>
                    </td>
                    <td>{order.items?.length || 0}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>{formatCurrency(order.total)}</td>
                    <td>
                      <select
                        className="adm-select"
                        value={order.status || "PENDING"}
                        disabled={updatingId === order.id || ["DELIVERED", "CANCELLED"].includes(order.status)}
                        onChange={(event) => handleStatusChange(order.id, event.target.value)}
                        aria-label={`Estado de orden ${order.id}`}
                      >
                        {statuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
