import { Router } from "express";
import { create } from "./checkout.controller.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { createCheckoutSchema } from "./checkout.validation";

const router = Router();

router.post("/", validate(createCheckoutSchema), checkoutController.create)
