import {Router} from "express";
import CartController from "./cart.controller.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { createCartSchema } from "./cart.validation.js";

const router = Router();

router.get("/", CartController.findAll);

router.get("/:id", CartController.findById);

router.post("/", validate(createCartSchema), CartController.create);

router.put("/:id", CartController.update);

router.delete("/:id", CartController.remove);
