const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ status: false, message: "No token provided" })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ status: false, message: "Invalid token" })
    } else {
      const user = await User.findById(data.id)
      if (user) {
        req.user = user; // Set user on request
        next(); // Proceed to next middleware/route
      } else {
        return res.status(401).json({ status: false, message: "User not found" })
      }
    }
  })
}
