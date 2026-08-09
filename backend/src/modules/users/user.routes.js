import { Router } from "express";
import * as controller from "./user.controller.js"
import { authenticate } from "../../shared/middleware/authenticate.middleware.js";
import { authorize } from "../../shared/middleware/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.get("/", controller.findAll)

router.get("/:id", controller.findById)

router.patch("/:id",
  authenticate,
  authorize(
    ROLES.ADMIN,
  ),
  controller.update)

router.delete("/:id",
  authenticate,
  authorize(
    ROLES.ADMIN
  ),
  controller.remove)

export default router;
