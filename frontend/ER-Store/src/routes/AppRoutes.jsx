import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { products } from "../data.jsx";
import { HomePage } from "../pages/home/HomePage.jsx";
import { CartPage } from "../pages/cart/CartPage.jsx";
import { ProductDetail } from "../pages/product/ProductDetail.jsx";
import { CheckoutPage } from "../pages/checkout/CheckoutPage.jsx";
import { RegisterPage } from "../pages/register/RegisterPage.jsx";
import { AccountPage } from "../pages/account/AccountPage.jsx";
import { OrderDetailPage } from "../pages/order/OrderDetailPage.jsx";
import AdminLayout from "../components/layout/AdminLayout.jsx";
import DashboardHome from "../pages/admin/DashboardHome.jsx";
import InventoryTable from "../pages/admin/InventoryTable.jsx";
import AddProduct from "../pages/admin/AddProduct.jsx";
import UpdateProduct from "../pages/admin/UpdateProduct.jsx";
import DeleteProduct from "../pages/admin/DeleteProduct.jsx";
import Invoice from "../pages/admin/Invoice.jsx";
import Reports from "../pages/admin/Reports.jsx";
import Settings from "../pages/admin/Settings.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export function AppRoutes() {
  const { user } = useAuth();
  const userRole = typeof user?.role === "string" ? user.role : user?.role?.name;

  return (
    <BrowserRouter>
      <Routes>
        {/* Tienda pública */}
        <Route
          path="/"
          element={userRole?.toUpperCase() === "ADMIN"
            ? <Navigate to="/admin" replace />
            : <HomePage products={products} />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/orders/:id" element={<OrderDetailPage />} />

        <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="inventory" element={<InventoryTable />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="update-product" element={<UpdateProduct />} />
            <Route path="delete-product" element={<DeleteProduct />} />
            <Route path="invoice" element={<Invoice />} />
            <Route path="reports" element={<Reports />} />
            <Route path="config" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
