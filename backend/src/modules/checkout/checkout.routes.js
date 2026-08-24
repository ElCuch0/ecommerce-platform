import { Router } from "express";
import * as controller from "./checkout.controller.js";
import { authenticate } from "../../shared/middleware/authenticate.middleware.js";

const router = Router();

router.post("/",
  authenticate,
  controller.checkout
)

export default router;
