import ErrorResponse from "../utils/error.response.js";
import jsonwebtoken from "jsonwebtoken";
import UsersModel from "../model/users.model.js";

/**
 * Authentication Handler
 *
 * User authentication handler
 */
class AuthenticationHandler
{

    /**
     * authenticate
     *
     * This will handle user permission authentication
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     * @todo check if creating shortcuts to deep dot noted values will speed up code performance.
     */
    static async authenticate(request, response, next)
    {
        let token;

        if(request.headers.authorization && request.headers.authorization.startsWith("Bearer"))
        {
            // Example token Bearer ADJ#($*(SLFJ()#_
            token = request.headers.authorization.split(" ")[1];
        }

        if(!token)
        {
            return next(new ErrorResponse("Not authorized to access this route!", 401));
        }

        try
        {
            let decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            let user = await UsersModel.findById(decoded.id);
            if(!user)
            {
                return next(new ErrorResponse("No user found with that id"), 404);
            }
            request.user = user;
            next();
        } catch(error)
        {
            next(error);
        }
    }
}

// Export the Authentication handler.
export default AuthenticationHandler;