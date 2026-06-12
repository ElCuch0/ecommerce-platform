export default function DashboardHome() {
  return (
    <>
      <h1 className="adm-page-title">Dashboard</h1>
      <p className="adm-page-subtitle">
        Resumen operativo de la tienda. Conecta el backend para datos en tiempo real.
      </p>

      <section className="adm-kpi-grid" aria-label="Indicadores">
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Ventas (hoy)</span>
          <span className="adm-stat__value">$0</span>
          <span className="adm-stat__hint">Sin conexión a datos reales</span>
        </article>
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Pedidos pendientes</span>
          <span className="adm-stat__value">0</span>
          <span className="adm-stat__hint">Revisar en Pedidos</span>
        </article>
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Productos activos</span>
          <span className="adm-stat__value">—</span>
          <span className="adm-stat__hint">Sincronizar con inventario</span>
        </article>
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Visitas (7 días)</span>
          <span className="adm-stat__value">—</span>
          <span className="adm-stat__hint">Informes en desarrollo</span>
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
                <tr>
                  <td colSpan={4} style={{ color: "var(--adm-muted)", fontSize: "0.9rem" }}>
                    No hay pedidos para mostrar.
                  </td>
                </tr>
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
          <p className="adm-card__meta">Conecta el API para listar alertas.</p>
        </section>
      </div>
    </>
  );
}
