import { Router } from "express";
import AuthController from "./auth.controller.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { createLoginSchema, createRegisterSchema } from "./auth.validation.js";

const router = Router();

router.post("/register", validate(createRegisterSchema), AuthController.register);

router.post("/login", validate(createLoginSchema), AuthController.login);
