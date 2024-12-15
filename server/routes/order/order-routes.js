import express from 'express';
import { createOrder, capturePayment, getUserAllOrder, getOrderDetails } from './order-controller.js';

const router = express.Router();

// Route to create an order: http://localhost:5000/order/create-order
router.post('/create-order', createOrder);

// Route to capture payment for an order: http://localhost:5000/order/capture-payment
router.post('/capture-payment', capturePayment);

// Route to get all order from user for an order: http://localhost:5000/order/get-order/:userId
router.get('/get-order/:userId', getUserAllOrder);

// Route to capture payment for an order: http://localhost:5000/order/order-details/:id
router.get('/order-details/:id', getOrderDetails);

export default router;