import express, { Router } from "express";
import { login, logout, profile, register } from "../controllers/auth.controller.js";
import upload from "../utils/multer.ts";
import protect from "../middleware/protect.ts";
// 1) router oluşturma
const router: Router = express.Router();
// 2) yollar belirlenir.
router.route("/register").post(upload.single("photo"), register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").get(protect, profile);

// 3) router'i app'e tanıtmak için export ederiz.

export default router;
