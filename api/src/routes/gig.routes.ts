import express, { Router } from "express";
import { createGig, deleteGig, getAllGigs, getGig } from "../controllers/gig.controller.ts";
// 1) router oluşturma
const router: Router = express.Router();
// 2) yollar belirlenir.
router.route("/").get(getAllGigs).post(createGig);
router.route("/:id").get(getGig).delete(deleteGig);

// 3) router'i app'e tanıtmak için export ederiz.

export default router;
