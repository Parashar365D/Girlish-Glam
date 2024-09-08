import express from 'express';
import jwt from "jsonwebtoken";
import { body, validationResult } from 'express-validator';
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import validator from "validator";

const router = express.Router();

//Route for create user using api http://localhost:5000/user/signup
router.post('/signup', [
  body('name', 'Name must contain at least 3 characters').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
  body('phone').custom((value) => { 
    if (!validator.isMobilePhone(value, 'any')) {
      throw new Error('Enter a valid phone number');
    }
    return true;
  })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success: false, error: 'A user with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      cartData: {}
    });

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };
    const authtoken = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ success: true, authtoken });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


// Route for user login using API http://localhost:5000/user/login
router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Invalid Credentials" });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };
        const authtoken = jwt.sign(payload, process.env.JWT_SECRET);

        res.json({ success: true, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

export default router;
