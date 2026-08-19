import dotenv from "dotenv/config";

export const env = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
  port: Number(process.env.PORT) || 3000,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173"
}
