import { Link } from "react-router-dom";

export default function Reports() {
  return (
    <>
      <h1 className="adm-page-title">Informes</h1>
      <p className="adm-page-subtitle">
        Panel de métricas y análisis. Esta sección está preparada para conectarse a datos reales.
      </p>

      <section className="adm-kpi-grid" aria-label="Indicadores de informes">
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Ventas semanales</span>
          <span className="adm-stat__value">Próximamente</span>
          <span className="adm-stat__hint">Vista previa de informes disponible pronto</span>
        </article>
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Tendencias de productos</span>
          <span className="adm-stat__value">En desarrollo</span>
          <span className="adm-stat__hint">Integración pendiente con inventario</span>
        </article>
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Clientes activos</span>
          <span className="adm-stat__value">Próximamente</span>
          <span className="adm-stat__hint">Métricas de fidelidad en la siguiente fase</span>
        </article>
        <article className="adm-card adm-card--stat">
          <span className="adm-stat__label">Canales</span>
          <span className="adm-stat__value">En preparación</span>
          <span className="adm-stat__hint">Dashboard completo pronto</span>
        </article>
      </section>

      <section className="adm-card" aria-labelledby="admReportsIntro">
        <div className="adm-card__head">
          <h2 className="adm-card__title" id="admReportsIntro">
            Resumen rápido
          </h2>
        </div>
        <p className="adm-card__meta">
          Cuando conectes el backend de ventas y pedidos, aquí aparecerán tus informes de ingresos, rotación de inventario y estadísticas clave.
        </p>
        <Link to="/admin" className="adm-btn adm-btn--outline">
          Volver al dashboard
        </Link>
      </section>
    </>
  );
}
