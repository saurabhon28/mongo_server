import express from "express";
import { getListingsAndReviews, createListingsAndReviews } from "../controllers/listingsAndReviews.js";

const router = express.Router();

router.get("/", getListingsAndReviews);
router.post("/", createListingsAndReviews)


export default router;