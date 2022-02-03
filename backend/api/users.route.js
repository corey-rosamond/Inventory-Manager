import express from "express";
import UsersController from "./users.controller.js";

const router = express.Router();

router.post('/registration', UsersController.apiUserRegistration);
router.post('/login', UsersController.apiUserLogin);
router.post('/logout', UsersController.apiUserLogout);

export default router;