import { Router } from "express";
import * as controller from "./user.controller.js"

const router = Router();

router.get("/", controller.findAll)

router.get("/:id", controller.findById)

router.patch("/:id", controller.update)

router.delete("/:id", controller.remove)

export default router;
