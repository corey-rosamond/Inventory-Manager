import ErrorResponse from "../utils/error.response.js";

/**
 * Error Handler
 *
 * This is an error handler that I pulled from a tutorial. I placed it in a class
 * because I intend to improve on it in the future, but for the moment this will
 * fill our need.
 */
class ErrorHandler
{
    /**
     * Do
     *
     * This method handles the errors
     * @param err
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    static async do(err, request, response, next)
    {
        let error = {...err};
        error.message = err.message;

        if(err.code === 1100)
        {
            let message = 'Duplicate Field Value Enter';
            error = new ErrorResponse(message, 400);
        }

        if(err.name === "validationError")
        {
            let message = Object.values(err.errors)
                .map((val) => val.message);
            error = new ErrorResponse(message, 4000);
        }

        response.status(error.statusCode || 500)
            .json({
                success:false,
                error: error.message || "Server Error"
            });
    }
}

export default ErrorHandler;