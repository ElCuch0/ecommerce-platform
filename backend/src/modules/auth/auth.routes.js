import { Router } from "express";
import * as controller from "./auth.controller.js"
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { createLoginSchema, createRegisterSchema } from "./auth.validation.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { defaultMaxListeners } from "node:events";

const router = Router();

router.post("/register", validate(createRegisterSchema), controller.register);

router.post("/login", validate(createLoginSchema), controller.login);

router.post("/", authenticate, controller.login);

export default router;
