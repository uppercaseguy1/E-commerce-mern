import express from "express";
const router = express.Router();
import rateLimit from "express-rate-limit";

import {
    createOrder,
    getAllOrders,
    getUserOrders,
    countTotalOrders,
    calculateTotalSales,
    calcualteTotalSalesByDate,
    findOrderById,
    markOrderAsPaid,
    markOrderAsDelivered,
} from "../controllers/orderController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const createOrderLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 5 orders per hour
});

const markOrderPaidLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // limit each IP to 10 requests per hour
});

const markOrderDeliveredLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // limit each IP to 30 requests per windowMs
});

const getAllOrdersLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
});

const getUserOrdersLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

const getOrderByIdLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

const countOrdersLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // limit each IP to 50 requests per hour
});

const calculateSalesLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // limit each IP to 50 requests per hour
});

const calculateSalesByDateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // limit each IP to 50 requests per hour
});

router
    .route("/")
    .post(authenticate, createOrderLimiter, createOrder)
    .get(authenticate, authorizeAdmin, getAllOrdersLimiter, getAllOrders);

router.route("/mine").get(authenticate, getUserOrdersLimiter, getUserOrders);
router.route("/total-orders").get(countOrdersLimiter, countTotalOrders);
router.route("/total-sales").get(calculateSalesLimiter, calculateTotalSales);
router.route("/total-sales-by-date").get(calculateSalesByDateLimiter, calcualteTotalSalesByDate);
router.route("/:id").get(authenticate, getOrderByIdLimiter, findOrderById);
router.route("/:id/pay").put(authenticate, markOrderPaidLimiter, markOrderAsPaid);
router
    .route("/:id/deliver")
    .put(authenticate, authorizeAdmin, markOrderDeliveredLimiter, markOrderAsDelivered);

export default router;
