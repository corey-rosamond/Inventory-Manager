import UsersDAO from "../dao/UsersDAO.js";

export default class UsersController
{


    static async apiAddUser(req, res, next)
    {
        //let { name, email, password, password_confirmation } = req.body;
        console.log("api add user");


    }

    static async apiLogin(req, res, next)
    {
        //let { email, password } = req.body;
        console.log("api login");
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