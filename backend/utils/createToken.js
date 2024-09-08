import jwt from "jsonwebtoken";
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "https://nexcommerce.netlify.app",
    credentials: true, // Allows cookies to be sent with requests
}));

const generateToken = (res, userId) => {
    console.log("creating token")
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    // Set JWT as an HTTP-Only Cookie
    // res.cookie("jwt", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //     path: "/",
    //     maxAge: 30 * 24 * 60 * 60 * 1000,
    // });

    return token;
};

export default generateToken;
