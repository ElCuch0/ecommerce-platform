import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="admin-layout">
            <Sidebar />

            <div className="content">
            <Topbar />
            <Outlet />
            </div>
        </div>
    );
}
