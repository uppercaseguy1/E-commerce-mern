import express from "express";
import {
    createUser,
    loginUser,
    logoutCurrentUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById,
} from "../controllers/userController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const adminUpdateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

router
    .route("/")
    .post(createUser)
    .get(authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
    .route("/profile")
    .get(authenticate, getCurrentUserProfile)
    .put(authenticate, updateCurrentUserProfile);

// ADMIN ROUTES 👇
router
    .route("/:id")
    .delete(authenticate, authorizeAdmin, deleteUserById)
    .get(authenticate, authorizeAdmin, getUserById)
    .put(authenticate, authorizeAdmin, adminUpdateLimiter, updateUserById);

export default router;
