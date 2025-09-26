const { Signup, Login, getUser, LogOut } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/me", userVerification, getUser);
router.get("/logout",LogOut);
module.exports = router;
