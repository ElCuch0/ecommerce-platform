import { Router } from "express";
import * as controller from "./user.controller.js"
import { authenticate } from "../../shared/middleware/authenticate.middleware.js";
import { authorize } from "../../shared/middleware/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { updateUserSchema } from "./user.validate.js";

const router = Router();

router.get("/",
  authenticate,
  authorize(
    ROLES.ADMIN
  ),
  controller.findAll)

router.get("/:id",
  authenticate,
  authorize(
    ROLES.ADMIN
  ),
  controller.findById)

router.patch("/:id",
  authenticate,
  authorize(
    ROLES.ADMIN,
  ),
  validate(updateUserSchema),
  controller.activate)

router.delete("/:id",
  authenticate,
  authorize(
    ROLES.ADMIN
  ),
  controller.deactivate)

export default router;
