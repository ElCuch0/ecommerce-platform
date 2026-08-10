import { Router } from "express";
import * as controller from "./inventoryMovement.controller.js"
import { authenticate } from "../../shared/middleware/authenticate.middleware.js";
import { authorize } from "../../shared/middleware/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { createinventoryMovementSchema } from "./inventoryMovement.validate.js";

const router = Router();

router.post("/",
  authenticate,
  authorize(
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  validate(createinventoryMovementSchema),
  controller.create)

router.get("/",
  authenticate,
  authorize(
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  controller.findAll)

router.get("/:id",
  authenticate,
  authorize(
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  controller.findById)

router.get("/inventory/:inventoryId",
  authenticate,
  authorize(
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  controller.findByInventoryId
)

export default router;
