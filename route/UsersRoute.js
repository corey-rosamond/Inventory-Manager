import express from "express";
import UsersController from "../controller/UsersController.js";

const router = express.Router();

router.route('/add')
    .post(UsersController.apiAddUser);

router.route('/login')
    .post(UsersController.apiLogin);

router.route('/forgot-password')
    .post(UsersController.apiForgotPassword);

router.route('/reset-password/:reset_token')
    .put(UsersController.apiResetPassword);

export default router;