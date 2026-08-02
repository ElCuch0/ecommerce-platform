import { useState } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import "../../assets/styles/admin/admin.css";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`adm-app${sidebarOpen ? " adm-app--sidebar-open" : ""}`}>
      <button
        type="button"
        className="adm-overlay"
        aria-label="Cerrar menú"
        onClick={() => setSidebarOpen(false)}
      />

      <TopBar onMenuClick={() => setSidebarOpen((open) => !open)} />

      <div className="adm-body">
        <SideBar onNavigate={() => setSidebarOpen(false)} />
        <main className="adm-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
