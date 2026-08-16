import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../../../src/app.js"
import { email } from "zod";

describe("Auth - Login", () => {

  it("debería rechazar credenciales incorrectas", async () => {

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "usuario-inexistente@test.com",
        password: "PasswordIncorrecta123"
      })

      expect(response.status).toBe(401)
  })
})
