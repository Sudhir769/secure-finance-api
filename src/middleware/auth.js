import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Invalid or expired token." });
    }

        req.user = decodedUser;
        next();
    });
};

export default authenticateToken ;
