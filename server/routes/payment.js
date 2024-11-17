import express from "express";
import paymentController from "../controllers/payment.js";

const router = express.Router();

router.post("/create-payment", paymentController.createPayment);

export default router;
