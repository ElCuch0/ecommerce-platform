import { Router } from "express";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import * as controller from "./user.controller.js"

const router = Router();

router.get("/", controller.findAll)

router.get("/:id", controller.findById)

router.patch("/:id", controller.update)

router.delete("/:id", controller.remove)
