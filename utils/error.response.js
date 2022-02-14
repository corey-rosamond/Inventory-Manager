/**
 * Error Response
 *
 * This is the Error Wrapper.
 */
class ErrorResponse extends Error
{
    /**
     * Constructor
     * @param message Error message
     * @param code Error status code
     */
    constructor(message, code)
    {
        super(message);
        this.statusCode = code;
    }
}

// Export the ErrorResponse class.
export default ErrorResponse;