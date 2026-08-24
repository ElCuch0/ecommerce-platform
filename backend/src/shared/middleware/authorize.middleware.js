import { ForbiddenError } from "../errors/ForbiddenError.js"

export function authorize(...allowedRoles) {

  return (req, res, next) => {

    if (!req.user) {
      return next(
        new ForbiddenError("Usuario no autenticado")
      )
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ForbiddenError("No tienes permisos para realizar esta acción")
      )
    }

    next()

  }
}
