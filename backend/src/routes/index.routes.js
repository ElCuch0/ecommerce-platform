import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user.routes.js"
import productRoutes from "../modules/products/product.routes.js"
import categoryRoutes from "../modules/categories/categories.routes.js";
import inventoryRoutes from "../modules/inventory/inventory.routes.js";
import inventoryMovementRoutes from "../modules/inventory-movements/inventoryMovement.routes.js"
import cartRoutes from "../modules/cart/cart.routes.js";
import orderRoutes from "../modules/orders/order.routes.js"
import checkoutRoutes from "../modules/checkout/checkout.routes.js";
//import invoiceRoutes from "../modules/invoices/invoices.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/inventory-movements", inventoryMovementRoutes)
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes)
router.use("/checkout", checkoutRoutes);
//router.use("/invoices", invoiceRoutes);

export default router;
