import UsersModel from "../model/users.model.js";
import ErrorResponse from "../utils/error.response.js";

/**
 * User Controller
 *
 * This is the User Controller it will handle all interactions related to users.
 */
export default class UsersController
{
    /**
     * API Add User
     *
     * This method will handle all add user requests.
     * @param request
     * @param response
     * @param next
     * @returns {Promise<*>}
     */
    static async apiAddUser(request, response, next)
    {
        try
        {
            let {username, email_address, password} = request.body;
            let user = UsersModel.create({
                username,
                email_address,
                password
            });
            return response.status(201)
                .json({
                    success: true,
                    token: user.getSignedToken()
                });
        } catch (error)
        {
            /**
             * Call next and give it the error. The error handler should take it from here.
             */
            next(error);
        }
    }

    /**
     * API Login
     *
     * This handles the API Login requests.
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    static async apiLogin(request, response, next)
    {
        try
        {
            let {
                email_address,
                password
            } = request.body;

            if(!email_address)
            {
                return next(new ErrorResponse("Email Address not provided!", 400));
            }

            if(!password)
            {
                return next(new ErrorResponse("Password not provided!", 400));
            }

            let user = await UsersModel
                .findOne({email_address})
                .select("password");

            if(!user)
            {
                return next(new ErrorResponse("Invalid Credentials!", 401));
            }

            let is_match = await user.matchPassword(password);

            if(!is_match)
            {
                return next(new ErrorResponse("Invalid Credentials!", 401));
            }
            return response
                .status(200)
                .json({
                    success: true,
                    token: user.getSignedToken()
                });

        } catch (error)
        {
            next(error);
        }
    }

    /**
     * API Forgot Password
     *
     * This will handle forgot password requests.
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     * @todo Finish this
     */
    static async apiForgotPassword(req, res, next)
    {
        console.log("api forgot password")
    }

    /**
     * API Reset Password
     *
     * This will handle api reset password requests.
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     * @todo finish this
     */
    static async apiResetPassword(req, res, next)
    {
        console.log("api reset password")
    }
}