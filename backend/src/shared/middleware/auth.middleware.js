import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { verifyToken } from "../utils/jwt.js";

export async function authenticate(req, res, next) {

    try {

        const token = req.headers.authorization?.split(" ")[1];

        if(!token) {
            return next(new UnauthorizedError("Token no proporcionado"));
        }

        const payload = verifyToken(token);

        req.user = payload;

        next();

    } catch(error) {
        next(new UnauthorizedError("Token inválido"));
    }

}
