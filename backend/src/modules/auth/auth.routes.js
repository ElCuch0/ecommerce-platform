import { Router } from "express";
import * as controller from "./auth.controller.js"
import { validate } from "../../shared/middleware/validate.middleware.js"
import { loginSchema, registerSchema } from "./auth.validate.js";
import { defaultMaxListeners } from "node:events";
import { authenticate } from "../../shared/middleware/authenticate.middleware.js";
import { authorize } from "../../shared/middleware/authorize.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), controller.register);

router.post("/login", validate(loginSchema), controller.login);

router.post("/refresh", controller.refresh)

router.post("/logout", controller.logout);

router.get("/test-auth", authenticate, authorize("ADMIN"), (req, res) => {
  res.json({
    message: "Autentiación correcta",
    user: req.user
  })
})

router.get("/me", authenticate, controller.me)

export default router;
