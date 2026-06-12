import { NavLink, Link } from "react-router-dom";
import logoEr from "../../assets/images/Logo_ER.png";

function topLinkClass({ isActive }) {
  return isActive ? "adm-topbar__link adm-topbar__link--active" : "adm-topbar__link";
}

export default function TopBar({ onMenuClick }) {
  return (
    <header className="adm-topbar">
      <button
        type="button"
        className="adm-topbar__menu"
        aria-label="Abrir menú lateral"
        onClick={onMenuClick}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <Link to="/admin" className="adm-topbar__brand" aria-label="Inicio administración">
        <img src={logoEr} alt="" />
        <span>ER Admin</span>
      </Link>

      <nav className="adm-topbar__nav" aria-label="Secciones">
        <NavLink to="/admin" end className={topLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/inventory" className={topLinkClass}>
          Inventario
        </NavLink>
        <NavLink to="/admin/invoice" className={topLinkClass}>
          Pedidos
        </NavLink>
        <span className="adm-topbar__link" style={{ opacity: 0.5, cursor: "default" }}>
          Informes
        </span>
        <span className="adm-topbar__link" style={{ opacity: 0.5, cursor: "default" }}>
          Configuración
        </span>
      </nav>
    </header>
  );
}
