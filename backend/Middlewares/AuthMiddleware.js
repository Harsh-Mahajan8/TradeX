const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

// Middleware: protect routes
const userVerification = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: false, message: "No token found" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: false, message: "Invalid token" });
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ status: false, message: "User not found" });
      }

      req.user = user;   // attach user to request
      next();            // continue to next handler
    });
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// Endpoint handler: for /user/verify
const verifyEndpoint = (req, res) => {
  if (req.user) {
    return res.json({ status: true, user: req.user.username });
  }
  return res.json({ status: false });
};

module.exports = { userVerification, verifyEndpoint };
