import express, { Router } from "express";
// 1) router oluşturma
const router: Router = express.Router();
// 2) yollar belirlenir.
router.route("/").get();
router.route("/:id").get();

// 3) router'i app'e tanıtmak için export ederiz.

export default router;
