import { Router } from "express";
import * as controller from "../modules/products/product.controller.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { createProductSchema, updateProductSchema } from "./product.validation.js";
import { authenticate } from "../../shared/middleware/authenticate.middleware.js";
import { authorize } from "../../shared/middleware/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

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
  validate(createProductSchema),
  controller.create);

router.put("/:id",
  authenticate,
  authorize(
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  validate(updateProductSchema),
  controller.update);

router.delete("/:id",
  authenticate,
  authorize(
    ROLES.ADMIN
  ),
  controller.remove);

export default router;
