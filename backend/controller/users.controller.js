import UsersModel from "../model/users.model.js";
import ErrorResponse from "../utils/error.response.js";
import SendEmail from "../utils/send.email.js";

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
                return next(new ErrorResponse("SendEmail Address not provided!", 400));
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
     * @param request
     * @param response
     * @param next
     * @returns {Promise<void>}
     */
    static async apiForgotPassword(request, response, next)
    {
        try
        {
            let { email_address } = request.body;
            let user = await UsersModel.findOne({email_address});

            if(!user)
            {
                return next(new ErrorResponse("SendEmail could not be sent!"), 404);
            }

            let reset_token = user.getResetPasswordToken();

            await user.save();

            let reset_url = `https://localhost:3000/password_reset/${reset_token}`;
            let message = `
                <h1>You have requested a password reset</h1>
                <p>Please go to this link to reset your password</p>
                <a href=${reset_url} clicktracking=off>${reset_token}</a>
            `;
            // @todo do some searching on nested javascript try catch statements this feels dirty.
            try
            {
                await SendEmail.do({
                    to: user.email_address,
                    subject: "Reset Password Request",
                    text: message
                });
                response.status(200)
                    .json({
                        success: true,
                        data: "Email Sent"
                    });
            } catch (error)
            {
                user.reset_password_token = undefined;
                user.reset_password_expire = undefined;

                await user.save();

                next(new ErrorResponse("Email could not be sent!"), 500);
            }
        } catch(error)
        {
            next(next);
        }
    }

    /**
     * API Reset Password
     *
     * This will handle controller reset password requests.
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     * @todo finish this
     */
    static async apiResetPassword(req, res, next)
    {
        console.log("controller reset password")
    }
}