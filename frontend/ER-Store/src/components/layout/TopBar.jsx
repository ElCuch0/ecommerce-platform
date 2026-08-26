import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import logoEr from "../../assets/images/Logo_ER.png";

function topLinkClass({ isActive }) {
  return isActive ? "adm-topbar__link adm-topbar__link--active" : "adm-topbar__link";
}

export default function TopBar({ onMenuClick }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

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
        <NavLink to="/admin/orders" className={topLinkClass}>
          Pedidos
        </NavLink>
        <NavLink to="/admin/reports" className={topLinkClass}>
          Informes
        </NavLink>
        <span className="adm-topbar__link adm-topbar__link--disabled" aria-disabled="true" title="Función futura">
          Configuración
        </span>
      </nav>

      <button type="button" className="adm-topbar__logout" onClick={handleLogout}>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
          <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
        </svg>
        <span>Cerrar sesión</span>
      </button>
    </header>
  );
}
