import { Router } from "express";
import * as controller from "./invoices.controller.js"
import { authenticate } from "../../shared/middleware/authenticate.middleware.js";
import { authorize } from "../../shared/middleware/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { invoiceIdSchema } from "./invoices.validate.js";

const router = Router();

router.use(authenticate)

router.get("/all",
  authorize(
    ROLES.ADMIN
  ),
  controller.getAll
)

router.get("/",
  validate(invoiceIdSchema),
  controller.getMyInvoice
)

export default router;
