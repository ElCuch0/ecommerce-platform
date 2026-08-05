import {Router} from "express";
import InventoryController from "./inventory.controller.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { createInventorySchema } from "./inventory.validation.js";

const router = Router();

router.get("/", InventoryController.findAll);

router.patch("/:productId/stock", InventoryController.patchStock);

router.patch(":productId/min-stock", InventoryController.patchMinStock);
