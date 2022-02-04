import UsersModel from "../model/users.model.js";

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
                    user
                });
        } catch (error)
        {
            response.status(500)
                .json({
                    success: false,
                    error: error.message
                });
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
            let { email_address, password } = request.body;
            if(!email_address)
            {
                return request.
                status(400)
                    .json({
                        success: false,
                        error: "Email Address not provided!"
                    });
            }
            if(!password)
            {
                return request.
                status(400)
                    .json({
                        success: false,
                        error: "Password not provided!"
                    });
            }
            let user = await UsersModel
                .findOne({email_address})
                .select("password");
            if(!user)
            {
                return response
                    .status(401)
                    .json({
                        success: false,
                        error: "Invalid Credentials!"
                    });
            }
            let is_match = await user.matchPassword(password);
            if(!is_match)
            {
                return response
                    .status(401)
                    .json({
                        success: false,
                        error: "Invalid Credentials!"
                    });
            }
            return response
                .status(200)
                .json({
                    success: true,
                    token: "adsfasdfasdf"
                });

        } catch (error)
        {
            return response
                .status(500)
                .json({
                    success: false,
                    error: error.message
                });
        }
    }

    static async apiForgotPassword(req, res, next)
    {
        console.log("api forgot password")
    }

    static async apiResetPassword(req, res, next)
    {
        console.log("api reset password")
    }

}