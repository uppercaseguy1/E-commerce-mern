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

const adminDeleteLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 login attempts per windowMs
});

const createUserLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // limit each IP to 10 registrations per hour
});

const logoutLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // limit each IP to 50 logouts per hour
});

const updateProfileLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // limit each IP to 10 profile updates per hour
});

const getProfileLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

const getAllUsersLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
});

const getUserByIdLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

router
    .route("/")
    .post(createUserLimiter, createUser)
    .get(getAllUsersLimiter, authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", loginLimiter, loginUser);
router.post("/logout", logoutLimiter, logoutCurrentUser);

router
    .route("/profile")
    .get(getProfileLimiter, authenticate, getCurrentUserProfile)
    .put(updateProfileLimiter, authenticate, updateCurrentUserProfile);

// ADMIN ROUTES 👇
router
    .route("/:id")
    .delete(adminDeleteLimiter, authenticate, authorizeAdmin, deleteUserById)
    .get(getUserByIdLimiter, authenticate, authorizeAdmin, getUserById)
    .put(adminUpdateLimiter, authenticate, authorizeAdmin, updateUserById);

export default router;
