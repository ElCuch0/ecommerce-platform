import { BrowserRouter, Routes, Route } from "react-router-dom"
import { products } from '../data.jsx'
import { HomePage } from "../pages/home/HomePage.jsx"
import { CartPage } from "../pages/cart/CartPage.jsx"
import { ProductDetail } from "../pages/product/ProductDetail.jsx"
import { CheckoutPage } from "../pages/checkout/CheckoutPage.jsx"

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<HomePage products={products} />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

      </Routes>
    </BrowserRouter>
  )
}
