// import jwt from "jsonwebtoken";

// const generateToken = (res, userId) => {
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//         expiresIn: "30d",
//     });

//     // Set JWT as an HTTP-Only Cookie
//     res.cookie("jwt", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//     });

//     return token;
// };

// export default generateToken;

//

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();

const corsOptions = {
    origin: 'https://nexcommerce.netlify.app',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return token;
};

export default generateToken;