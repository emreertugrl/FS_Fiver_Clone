import express, { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
// 1) router oluşturma
const router: Router = express.Router();
// 2) yollar belirlenir.
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

// 3) router'i app'e tanıtmak için export ederiz.

export default router;
