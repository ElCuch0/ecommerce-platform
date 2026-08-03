import {Router} from "express";
import InventoryController from "./inventory.controller.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { createInventorySchema } from "./inventory.validation.js";

const router = Router();

router.get("/", InventoryController.findAll);

router.get("/:id", InventoryController.findById);

router.post("/", validate(createInventorySchema), InventoryController.create);

router.put("/:id", InventoryController.update);

router.delete("/:id", InventoryController.remove);
