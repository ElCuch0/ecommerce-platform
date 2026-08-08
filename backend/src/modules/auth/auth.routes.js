import { Router } from "express";
import * as controller from "./auth.controller.js"
import { validate } from "../../shared/middleware/validate.middleware.js"
import { loginSchema, registerSchema } from "./auth.validate.js";
import { defaultMaxListeners } from "node:events";

const router = Router();

router.post("/register", validate(registerSchema), controller.register);

router.post("/login", validate(loginSchema), controller.login);

router.post("/refresh", controller.refresh)

router.post("/logout", controller.logout);

export default router;
