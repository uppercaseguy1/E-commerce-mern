import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    // Debugging log to verify token creation
    console.log("Generated Token:", token);

    // Set JWT as an HTTP-Only Cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // Debugging log to verify cookie setting
    console.log("Cookie set successfully");

    return token;
};

export default generateToken;
