import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import dotenv from "dotenv";
import { validationResult } from "express-validator";

dotenv.config();

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: 'A user with this email already exists' });
        }

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        user = new User({
            name: name,
            email: email,
            password: hashPassword
        });

        await user.save();

        const payload = { user: { id: user._id, role: user.role, email: user.email, name: user.name } };

        const authtoken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.cookie("token", authtoken, { httpOnly: true, secure: true, maxAge: 3600000 });
        
        res.status(200).json({ success: true, authtoken, message: "Registration Successful" });
    } catch (error) {
        res.json({ success: false, error: 'Internal Server Error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const isUser = await bcrypt.compare(password, user.password);
        if (!isUser) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const payload = { user: { id: user._id, role: user.role, email: user.email, name: user.name } };
        const authtoken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", authtoken, { httpOnly: true, secure: true, maxAge: 3600000 });

        res.status(200).json({ success: true, message: "Login Successful" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

const fetchUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate using a valid token' });
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedData.user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
};

export { registerUser, loginUser, logoutUser, fetchUser };