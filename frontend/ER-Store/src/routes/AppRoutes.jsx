import { BrowserRouter, Routes, Route } from "react-router-dom"
import { products } from '../data.jsx'
import { HomePage } from "../pages/home/HomePage.jsx"
import { CartPage } from "../pages/cart/CartPage.jsx"

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

      </Routes>
    </BrowserRouter>
  )
}
