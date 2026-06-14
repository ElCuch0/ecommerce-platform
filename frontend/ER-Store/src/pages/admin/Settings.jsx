import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <>
      <h1 className="adm-page-title">Configuración</h1>
      <p className="adm-page-subtitle">
        Ajustes globales del panel administrativo. Esta función llegará muy pronto.
      </p>

      <section className="adm-card" aria-labelledby="admSettingsTitle">
        <div className="adm-card__head">
          <h2 className="adm-card__title" id="admSettingsTitle">
            Función futura
          </h2>
          <span className="adm-badge adm-badge--muted">Coming soon</span>
        </div>

        <p className="adm-card__meta">
          En esta sección podrás gestionar la configuración de la tienda, métodos de pago, envíos y permisos de usuario.
        </p>

        <div className="adm-muted-banner">
          Configuración aún no disponible. Estamos preparando la integración y la interfaz de administración.
        </div>

        {/* Botón de navegación para volver al dashboard, aunque la sección aún no tenga contenido funcional */}
        <Link to="/admin" className="adm-btn adm-btn--outline">
          Volver al dashboard
        </Link>
      </section>
    </>
  );
}
