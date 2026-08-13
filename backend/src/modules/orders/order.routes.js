import { Router } from "express";
import * as controller from "./order.controller.js"
import { authenticate } from "../../shared/middleware/authenticate.middleware";
import { authorize } from "../../shared/middleware/authorize.middleware.js"
import { ROLES } from "../../shared/constants/roles.js"
import { validate } from "../../shared/middleware/validate.middleware.js"
import { orderIdSchema, updateOrderStatusSchema } from "./order.validate.js";

const router = Router()

router.use(authenticate)

router.get("/",
  controller.getMyOrders
)

router.get("/all",
  authorize(
    ROLES.ADMIN
  ),
  controller.getAllOrders
)

router.get("/:id",
  validate(orderIdSchema),
  controller.getMyOrderById
)

router.patch("/:id/status",
  authorize(
    ROLES.ADMIN
  ),
  validate(updateOrderStatusSchema),
  controller.updateOrderStatus
)

export default router;
