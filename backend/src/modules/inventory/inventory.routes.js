import {Router} from "express";
import * as controller from "./inventory.controller.js";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { updateStockSchema, updateMinStockSchema, inventoryIdSchema } from "./inventory.validate.js";
import { authenticate } from "../../shared/middleware/authenticate.middleware.js";
import { authorize } from "../../shared/middleware/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.get("/",
  authenticate,
  authorize(
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  controller.findAll);

router.get("/:id",
  authenticate,
  authorize(
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  validate(inventoryIdSchema),
  controller.findByProductId)

router.patch("/:id/stock",
  authenticate,
  authorize(
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  validate(updateStockSchema),
  controller.updateStock);

router.patch("/:id/min-stock",
  authenticate,
  authorize(
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  validate(updateMinStockSchema),
  controller.updateMinStock);

export default router;
