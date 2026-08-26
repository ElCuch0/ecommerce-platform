import { NavLink } from "react-router-dom";

function sidebarLinkClass({ isActive }) {
  return isActive ? "adm-sidebar__link adm-sidebar__link--active" : "adm-sidebar__link";
}

export default function SideBar({ onNavigate }) {
  return (
    <aside className="adm-sidebar" aria-label="Submenú administrativo">
      <p className="adm-sidebar__label">Vista general</p>
      <NavLink to="/admin" end className={sidebarLinkClass} onClick={onNavigate}>
        Resumen
      </NavLink>

      <p className="adm-sidebar__label" style={{ marginTop: "1rem" }}>
        Inventario
      </p>
      <NavLink to="/admin/inventory" className={sidebarLinkClass} onClick={onNavigate}>
        Tabla de inventario
      </NavLink>
      <NavLink to="/admin/add-product" className={sidebarLinkClass} onClick={onNavigate}>
        Agregar
      </NavLink>
      <NavLink to="/admin/update-product" className={sidebarLinkClass} onClick={onNavigate}>
        Actualizar
      </NavLink>
      <NavLink to="/admin/delete-product" className={sidebarLinkClass} onClick={onNavigate}>
        Estado de productos
      </NavLink>

      <p className="adm-sidebar__label" style={{ marginTop: "1rem" }}>
        Catálogo
      </p>
      <NavLink to="/admin/categories" className={sidebarLinkClass} onClick={onNavigate}>
        Categorías
      </NavLink>
      <NavLink to="/admin/orders" className={sidebarLinkClass} onClick={onNavigate}>
        Órdenes
      </NavLink>

      <p className="adm-sidebar__label" style={{ marginTop: "1rem" }}>
        Informes
      </p>
      <NavLink to="/admin/reports" className={sidebarLinkClass} onClick={onNavigate}>
        Ver informes
      </NavLink>
      <div className="adm-sidebar__link adm-sidebar__link--disabled" aria-disabled="true" title="Función futura">
        Configuración
      </div>
    </aside>
  );
}
