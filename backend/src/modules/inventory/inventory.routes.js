import {Router} from "express";
import * as controller from "./inventory.controller.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { updateInventorySchema } from "./inventory.validate.js";
import { authenticate } from "../../shared/middleware/authenticate.middleware.js";
import { authorize } from "../../shared/middleware/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.get("/",
  authenticate,
  authorize(
    ROLES.CUSTOMER,
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  controller.findAll);

router.patch("/:productId/stock",
  authenticate,
  authorize(
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  validate(updateInventorySchema),
  controller.patchStock);

router.patch(":productId/min-stock",
  authenticate,
  authorize(
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  validate(updateInventorySchema),
  controller.patchMinStock);

export default router;
