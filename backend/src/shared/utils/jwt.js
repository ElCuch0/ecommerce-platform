import { jwt } from "jsonwebtoken";
import { dotenv } from "dotenv";
import { UnauthorizedError } from "../errors/unauthorized.error.js";

dotenv.config();

export function generateToken(payload, secret, expiresIn) {
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new UnauthorizedError("Token inválido");
  }
}
