import {Router} from "express";
import CartController from "./cart.controller.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { createCartSchema } from "./cart.validation.js";
import { authenticate } from "../../shared/middleware/authenticate.middleware.js";
import { authorize } from "../../shared/middleware/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.get("/:id",
  authenticate,
  authorize(
    ROLES.CUSTOMER
  ),
  CartController.findById);

router.post("/", validate(createCartSchema), CartController.create);

router.delete("/:id", CartController.remove);
