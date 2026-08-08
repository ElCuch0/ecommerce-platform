export class ValidationError extends Error {

    constructor(message, errors = []) {
        super(message);

        this.name = "Validation Error";

        this.statusCode = 400;

        this.errors = errors;
    }

}
