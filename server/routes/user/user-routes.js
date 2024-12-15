import express from "express";
import { fetchUser, loginUser, logoutUser, registerUser } from "./auth-controller.js";

const router = express.Router();

// Route to create a user using API endpoint: http://localhost:5000/user/signup
router.post('/signup', registerUser);

// Route to login user using API endpoint: http://localhost:5000/user/login
router.post('/login', loginUser);

// Route to login user using API endpoint: http://localhost:5000/user/logout
router.post('/logout', logoutUser);

// Route to check authenticated user using API endpoint: http://localhost:5000/user/check-auth
router.get('/checkauth', fetchUser, (req, res) => {
    const { id, name, role, email } = req.user;
    res.status(200).json({ success: true, message: "Authenticated user!", user: { id, name, role , email} });
});



export default router;