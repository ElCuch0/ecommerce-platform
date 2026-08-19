import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../../../src/app.js";

describe("Auth - Login", () => {

    const user = {
        name: "Login",
        lastname: "Test",
        email: `login-${Date.now()}@example.com`,
        password: "Test123456",
        phone: "3001234567"
    };


    it("AUTH-07 | debería iniciar sesión correctamente", async () => {

        // Crear usuario
        const registerResponse = await request(app)
            .post("/api/auth/register")
            .send(user);

        expect(registerResponse.status).toBe(201);


        // Login
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: user.email,
                password: user.password
            });

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty("success");
        expect(response.body.success).toBe(true);

        expect(response.body.data).toBeDefined();
        expect(response.body.data).toHaveProperty("accessToken");

        expect(typeof response.body.data.accessToken).toBe("string");
        expect(response.body.data.accessToken.length).toBeGreaterThan(0);
    });


    it("AUTH-08 | debería rechazar una contraseña incorrecta", async () => {

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: user.email,
                password: "PasswordIncorrecta123"
            });

        expect(response.status).toBe(401);
    });


    it("AUTH-09 | debería rechazar un usuario inexistente", async () => {

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "usuario-inexistente@example.com",
                password: "Test123456"
            });

        expect(response.status).toBe(401);
    });


    it("AUTH-10 | debería rechazar un email inválido", async () => {

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "correo-invalido",
                password: "Test123456"
            });

        expect(response.status).toBe(400);
    });


    it("AUTH-11 | debería rechazar un body vacío", async () => {

        const response = await request(app)
            .post("/api/auth/login")
            .send({});

        expect(response.status).toBe(400);
    });


    it("AUTH-12 | nunca debería devolver 500 por credenciales incorrectas", async () => {

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "usuario-inexistente@example.com",
                password: "incorrecta"
            });

        expect(response.status).not.toBe(500);
    });

});
