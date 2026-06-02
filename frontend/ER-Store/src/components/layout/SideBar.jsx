import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <NavLink to="/admin/inventory">
        Tabla de inventario
      </NavLink>

      <NavLink to="/admin/add-product">
        Agregar
      </NavLink>

      <NavLink to="/admin/update-product">
        Actualizar
      </NavLink>

      <NavLink to="/admin/delete-product">
        Eliminar
      </NavLink>

    </aside>
  );
}
