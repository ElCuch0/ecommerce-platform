import {Router} from "express";
import * as controller from "./cart.controller.js";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { createCartItemSchema, updateCartItemSchema, productIdSchema } from "./cart.validate.js";
import { authenticate } from "../../shared/middleware/authenticate.middleware.js";

const router = Router();

router.use(authenticate)

router.get("/",
  controller.getCart);

router.post("/",
  validate(createCartItemSchema),
  controller.addToCart
)

router.patch("/:id",
  validate(updateCartItemSchema),
  controller.updateQuantity
)

router.delete("/:id",
  validate(productIdSchema),
  controller.removeFromCart
);

export default router;
