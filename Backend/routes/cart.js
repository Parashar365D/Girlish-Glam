import express from 'express';
import fetchuser from '../middleware/fetchuser.js';
import User from "../models/User.js";
import mongoose from "mongoose";

const router = express.Router();

// Route for Add To Cart using auth token and API http://localhost:5000/cart/addcart
router.post('/addcart', fetchuser, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        let user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!user.cartData) {
            user.cartData = {};
        }

        if (!user.cartData[productId]) {
            user.cartData[productId] = 0;
        }
        
        user.cartData[productId] += quantity;

        if (user.cartData[productId] <= 0) {
            delete user.cartData[productId];
        }

        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: user.cartData }, { new: true });

        res.json({ success: true, cart: user.cartData });
    } catch (error) {
        console.error('Error adding item to cart:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route for Remove from Cart using auth token and API http://localhost:5000/cart/removecart
router.post('/removecart', fetchuser, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        if (quantity <= 0 || isNaN(quantity)) {
            return res.status(400).json({ success: false, message: 'Invalid quantity' });
        }

        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!user.cartData) {
            user.cartData = {};
        }

        if (user.cartData[productId]) {
            user.cartData[productId] -= quantity;
            if (user.cartData[productId] <= 0) {
                delete user.cartData[productId];
            }

            await User.findOneAndUpdate({ _id: req.user.id }, { cartData: user.cartData }, { new: true });

            res.json({ success: true, cart: user.cartData });
        } else {
            res.status(400).json({ success: false, message: 'Product not in cart' });
        }
    } catch (error) {
        console.error('Error removing item from cart:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route for Clear from Cart using auth token and API http://localhost:5000/cart/clearcart
router.post('/clearcart', fetchuser, async (req, res) => {
    const { productId } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.cartData && user.cartData[productId]) {
            delete user.cartData[productId];
        } else {
            return res.status(400).json({ success: false, message: 'Product not in cart' });
        }

        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: user.cartData }, { new: true });
        res.json({ success: true, cart: user.cartData });
    } catch (error) {
        console.error('Error clearing item from cart:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route for Fetch Cart Items using auth token and API http://localhost:5000/cart/getcart
router.get('/getcart', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, cart: user.cartData || {} });
    } catch (error) {
        console.error('Error fetching cart:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

export default router;
