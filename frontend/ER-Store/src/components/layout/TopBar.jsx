import { NavLink } from "react-router-dom";
import { iconLogoSvg } from "../assets/Icons.jsx";

export default function TopBar() {
  return (
    <header className="topbar">
      <nav>
        {iconLogoSvg}
        <p>Dashboard</p>
        <p>Inventario</p>
        <p>Pedidos</p>
        <p>Informes</p>
        <p>Configuración</p>
        </nav>
    </header>
  )
}
