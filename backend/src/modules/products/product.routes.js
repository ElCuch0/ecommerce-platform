import { Router } from "express";
import controller from "../modules/products/product.controller.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { createProductSchema } from "./product.validation.js";

const router = Router();

router.get("/", controller.findAll);

router.get("/:id", controller.findById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.remove);
