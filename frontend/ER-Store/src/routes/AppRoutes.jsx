import { BrowserRouter, Routes, Route } from "react-router-dom";
import { products } from "../data.jsx";
import { HomePage } from "../pages/home/HomePage.jsx";
import { CartPage } from "../pages/cart/CartPage.jsx";
import { ProductDetail } from "../pages/product/ProductDetail.jsx";
import { CheckoutPage } from "../pages/checkout/CheckoutPage.jsx";
import { RegisterPage } from "../pages/register/RegisterPage.jsx";
import AdminLayout from "../components/layout/AdminLayout.jsx";
import DashboardHome from "../pages/admin/DashboardHome.jsx";
import InventoryTable from "../pages/admin/InventoryTable.jsx";
import AddProduct from "../pages/admin/AddProduct.jsx";
import UpdateProduct from "../pages/admin/UpdateProduct.jsx";
import DeleteProduct from "../pages/admin/DeleteProduct.jsx";
import Invoice from "../pages/admin/Invoice.jsx";
import Reports from "../pages/admin/Reports.jsx";
import Settings from "../pages/admin/Settings.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tienda pública */}
        <Route path="/" element={<HomePage products={products} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Panel administrativo (independiente del layout de la tienda) */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="inventory" element={<InventoryTable />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="update-product" element={<UpdateProduct />} />
          <Route path="delete-product" element={<DeleteProduct />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="reports" element={<Reports />} />
          <Route path="config" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
