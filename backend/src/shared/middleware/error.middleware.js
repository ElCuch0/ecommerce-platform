import { success } from "zod";

export default function errorMiddleware(error, req, res, next) {

    console.error(error)

    if (error.statusCode) {

        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            errors: error.errors
        })
    }

    return res.status(500).json({
        success: false,
        message: "Error interno del servidor"
    });

}
