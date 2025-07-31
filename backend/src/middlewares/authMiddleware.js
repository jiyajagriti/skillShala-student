import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔐 Authorization Header:", authHeader);

  const token = authHeader?.split(" ")[1];

  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use 'userId' if that's what you signed in the token
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      console.log("User not found in DB");
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.log("❌ Token verification failed:", error.message);
    res.status(401).json({ message: "Token failed" });
  }
};