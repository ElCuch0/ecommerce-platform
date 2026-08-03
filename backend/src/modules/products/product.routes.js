import { Router } from "express";
import ProductController from "../modules/products/product.controller.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { createProductSchema } from "./product.validation.js";

const router = Router();

router.get("/", ProductController.findAll);

router.get("/:id", ProductController.findById);

router.post("/", validate(createProductSchema), ProductController.create);

router.put("/:id", ProductController.update);

router.delete("/:id", ProductController.remove);
