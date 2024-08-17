import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    // Generate the JWT with userId as the payload
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",  // Token expires in 30 days
    });

    // Check if the site is served over HTTPS in production
    const isProduction = process.env.NODE_ENV === "production";

    // Set the JWT as an HTTP-only cookie
    res.cookie("jwt", token, {
        httpOnly: true,  // Makes the cookie inaccessible to JavaScript on the client side
        secure: isProduction,  // Ensures the cookie is only sent over HTTPS in production
        sameSite: isProduction ? "strict" : "lax",  // Prevents the cookie from being sent with cross-site requests in production
        maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days in milliseconds
    });

    console.log(`Cookie set. Secure: ${isProduction}, SameSite: ${isProduction ? 'strict' : 'lax'}`);

    return token;
};

export default generateToken;
