export class ForbiddenError extends Error {

    constructor(message = "No tienes permisos para realizar esta acción") {

        super(message);

        this.name = "ForbiddenError";
        this.statusCode = 403;
    }

}
