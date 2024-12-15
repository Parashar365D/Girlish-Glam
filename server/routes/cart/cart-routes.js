import express from 'express';
import { addToCart, updateCart, fetchCart, removeFromCart } from './cart-controller.js';

const router = express.Router();

// Route to add product in cart using API endpoint: http://localhost:5000/cart/add-cart
router.post('/add-cart', addToCart);

// Route to update product in cart using API endpoint: http://localhost:5000/cart/update-cart
router.put('/update-cart', updateCart);

// Route to fetch all products in cart using API endpoint: http://localhost:5000/cart/fetch-cart/:userId
router.get('/fetch-cart/:userId', fetchCart);

// Route to delete product in cart using API endpoint: http://localhost:5000/cart/remove-cart/:userId/:productId
router.delete('/remove-cart/:userId/:productId', removeFromCart);

export default router;
