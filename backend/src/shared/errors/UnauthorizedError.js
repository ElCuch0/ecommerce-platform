export class UnauthorizedError extends Error {

    constructor(message = "No autorizado") {

        super(message);

        this.name = "UnauthorizedError";
        this.statusCode = 401;
    }

}
