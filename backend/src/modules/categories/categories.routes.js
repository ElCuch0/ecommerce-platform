import { Router } from "express";
import CategoryController from "./categories.controller.js";

const router = Router();

router.get("/", CategoryController.findAll);

router.get("/:id", CategoryController.findById);

router.post("/", CategoryController.create);

router.put("/:id", CategoryController.update);

router.delete("/:id", CategoryController.remove);
