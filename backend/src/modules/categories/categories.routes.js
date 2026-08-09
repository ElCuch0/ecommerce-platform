import { Router } from "express";
import * as controller from "./categories.controller.js";
import { authenticate } from "../../shared/middleware/authenticate.middleware.js";
import { authorize } from "../../shared/middleware/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { categorySchema } from "./categories.validate.js";

const router = Router();

router.get("/",
  authenticate,
  controller.findAll);

router.get("/:id",
  authenticate,
  controller.findById);

router.post("/",
  authenticate,
  authorize(
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  validate(categorySchema),
  controller.create);

router.delete("/:id",
  authenticate,
  authorize(
    ROLES.ADMIN
  ),
  controller.remove);

export default router;
