const User = require("../models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {

    try {
        console.log(req.originalUrl);
        const { email, password, username, createdAt } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ message: "Email, username and password are required", success: false });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists", success: false });
        }
        const user = await User.create({ email, password, username, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
        });
        res
            .status(201)
            .json({ message: "User signed up successfully", success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        console.log(req.originalUrl)
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'All fields are required' })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User logged in successfully", success: true });
        next()
    } catch (error) {
        console.error(error);
    }
}

module.exports.Logout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(200).json({ message: "User logged out successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}
