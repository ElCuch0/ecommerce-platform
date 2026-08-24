import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { verifyToken } from "../utils/jwt.js";

export async function authenticate(req, res, next) {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        return next(
            new UnauthorizedError("Token de acceso requerido")
        )
    }

    const [type, token] = authHeader.split(" ")

    if (type !== "Bearer" || !token) {
        return next(
            new UnauthorizedError("Formato de token inválido")
        )
    }

    try {

        const payload = verifyToken(token)

        req.user = payload

        next()
    }catch (error) {

        return next(
            new UnauthorizedError("Token inválido o expirado")
        )
    }
}
