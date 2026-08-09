import { Router } from "express";
import { authenticate } from "../../shared/middleware/authenticate.middleware";
import { authorize } from "../../shared/middleware/authorize.middleware";
import { ROLES } from "../../shared/constants/roles";

const router = Router();

router.get("/:id",
  authenticate,
  authorize(
    ROLES.CUSTOMER,
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  controller.getById
)

router.get("/",
  authenticate,
  authorize(
    ROLES.EMPLOYEE,
    ROLES.ADMIN
  ),
  controller.getAll
)

router.post("/", invoicesController.create)
