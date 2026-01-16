import express from "express";
import formidable from "express-formidable";
import rateLimit from "express-rate-limit";
const router = express.Router();

// controllers
import {
    addProduct,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts,
} from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

const addProductLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // limit each IP to 20 requests per windowMs
});

const updateProductLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // limit each IP to 30 requests per windowMs
});

const deleteProductLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // limit each IP to 20 requests per windowMs
});

const addReviewLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // limit each IP to 10 reviews per hour
});

router
    .route("/")
    .get(fetchProducts)
    .post(authenticate, authorizeAdmin, addProductLimiter, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addReviewLimiter, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router
    .route("/:id")
    .get(fetchProductById)
    .put(authenticate, authorizeAdmin, updateProductLimiter, formidable(), updateProductDetails)
    .delete(authenticate, authorizeAdmin, deleteProductLimiter, removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router;
