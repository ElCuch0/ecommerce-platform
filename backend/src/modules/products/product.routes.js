import { Router } from "express";
import * as controller from "./product.controller.js";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { createProductSchema, productIdSchema, updateProductSchema } from "./product.validate.js";
import { authenticate } from "../../shared/middleware/authenticate.middleware.js";
import { authorize } from "../../shared/middleware/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.get("/",
  controller.findAll
)

router.get("/:id",
  validate(productIdSchema),
  controller.findById
)

router.post("/",
  authenticate,
  authorize(
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  validate(createProductSchema),
  controller.create
)

router.put("/:id",
  authenticate,
  authorize(
    ROLES.ADMIN
  ),
  validate(updateProductSchema),
  controller.update
)

router.delete("/:id",
  authenticate,
  authorize(
    ROLES.ADMIN
  ),
  validate(productIdSchema),
  controller.deactivate
)

router.patch("/:id",
  authenticate,
  authorize(
    ROLES.ADMIN
  ),
  validate(productIdSchema),
  controller.activate
)

export default router;
