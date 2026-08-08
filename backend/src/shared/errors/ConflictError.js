export class ConflictError extends Error {

    constructor(message = "Conflicto") {

        super(message);

        this.name = "ConflictError";
        this.statusCode = 409;
    }

}
