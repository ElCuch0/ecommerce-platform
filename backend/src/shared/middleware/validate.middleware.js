import { ValidationError } from "../errors/ValidationError.js"

export function validate(schema) {

    return (req, res, next) => {

            const result = schema.safeParse({
                body: req.body,
                params: req.params,
                query: req.query
            })

            if (!result.success) {

                const errors = result.error.issues.map(issue => ({
                    field: issue.path.join("."),
                    message: issue.message
                }))

                return next(
                    new ValidationError(
                        "Los datos enviados son invalidos",
                        errors
                    )
                )
                }

                req.body = result.data.body

                next();

            }
    }
